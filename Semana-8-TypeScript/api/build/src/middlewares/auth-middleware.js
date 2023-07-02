"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.notLoggedIn = exports.loginMiddleware = exports.verifyJWT = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const NotAuthorizedError_1 = require("../../errors/NotAuthorizedError");
const PermissionError_1 = require("../../errors/PermissionError");
const statusHTTP_1 = require("../../utils/constants/statusHTTP");
const get_env_1 = require("../../utils/functions/get-env");
const Usuario_1 = require("../domains/Usuarios/models/Usuario");
function generateJWT(user, response) {
    const body = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
    };
    const token = (0, jsonwebtoken_1.sign)({ user: body }, (0, get_env_1.getEnv)("SECRET_KEY"), { expiresIn: (0, get_env_1.getEnv)("JWT_EXPIRATION") });
    const cookieOption = { httpOnly: true, secure: (0, get_env_1.getEnv)("NODE_ENV") !== "development" };
    response.cookie("jwt", token, cookieOption);
}
function cookieExtractor(request) {
    let token = null;
    if (request && request.cookies) {
        token = request.cookies["jwt"];
    }
    return token;
}
function verifyJWT(request, response, next) {
    try {
        const token = cookieExtractor(request);
        if (token) {
            const decoded = (0, jsonwebtoken_1.verify)(token, (0, get_env_1.getEnv)("SECRET_KEY"));
            request.user = decoded.user;
        }
        if (!request.user) {
            throw new PermissionError_1.PermissionError("Você não está logado!");
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.verifyJWT = verifyJWT;
function loginMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Usuario_1.Usuario.findOne({ where: { email: request.body.email } });
            if (!user) {
                throw new NotAuthorizedError_1.NotAuthorizedError("E-mail ou senha incorretos");
            }
            else {
                const check = yield (0, bcrypt_1.compare)(request.body.senha, user.senha);
                if (!check) {
                    throw new NotAuthorizedError_1.NotAuthorizedError("E-mail ou senha incorretos");
                }
            }
            generateJWT(user, response);
            response.status(statusHTTP_1.statusHTTP.no_content).end();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.loginMiddleware = loginMiddleware;
function notLoggedIn(request, response, next) {
    try {
        const token = cookieExtractor(request);
        if (token) {
            const checked = (0, jsonwebtoken_1.verify)(token, (0, get_env_1.getEnv)("SECRET_KEY"));
            if (checked) {
                throw new PermissionError_1.PermissionError("Você já está logado");
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.notLoggedIn = notLoggedIn;
const checkRole = (cargos) => {
    return (request, response, next) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            !cargos.includes(request.user.cargo) ? response.json("Você não possui permissão para realizar essa ação!") : next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.checkRole = checkRole;
