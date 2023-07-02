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
exports.router = void 0;
const express_1 = require("express");
const cargos_1 = require("../../../../utils/constants/cargos");
const statusHTTP_1 = require("../../../../utils/constants/statusHTTP");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const UsuarioService_1 = require("../services/UsuarioService");
exports.router = (0, express_1.Router)();
// ------------------ Rotas de Login e Logout ----------------------------------------//
exports.router.post("/login", auth_middleware_1.notLoggedIn, auth_middleware_1.loginMiddleware);
exports.router.post("/logout", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.clearCookie("jwt");
        response.status(statusHTTP_1.statusHTTP.no_content).end();
    }
    catch (error) {
        next(error);
    }
}));
// -----------------------------------------------------------------------------------//
exports.router.get("/list", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield UsuarioService_1.UsuarioService.getUsuarios();
        response.status(statusHTTP_1.statusHTTP.success).send(usuarios);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.get("/list/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield UsuarioService_1.UsuarioService.getUsuarioId(request.params.id);
        response.status(statusHTTP_1.statusHTTP.success).send(usuario);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.post("/add", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UsuarioService_1.UsuarioService.postUsuario(request.body);
        response.status(statusHTTP_1.statusHTTP.created).json({ "message": "Usuário criado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.put("/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield UsuarioService_1.UsuarioService.putUsuario(request.params.id, request.body, request.user);
        response.status(statusHTTP_1.statusHTTP.success).json({ "message": "Usuário atualizado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.delete("/delete/:id", auth_middleware_1.verifyJWT, (0, auth_middleware_1.checkRole)([cargos_1.cargos.admin]), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield UsuarioService_1.UsuarioService.deleteUsuario(request.params.id, request.user.id);
        response.status(statusHTTP_1.statusHTTP.no_content).json({ "message": "Usuário deletado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
