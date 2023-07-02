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
const statusHTTP_1 = require("../../../../utils/constants/statusHTTP");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const MusicaService_1 = require("../../Musicas/services/MusicaService");
const UsuarioMusicaService_1 = require("../services/UsuarioMusicaService");
exports.router = (0, express_1.Router)();
exports.router.get("/usuarios-musicas", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuariosMusicas = yield UsuarioMusicaService_1.UsuarioMusicaService.getUsuariosMusicas();
        response.status(statusHTTP_1.statusHTTP.success).send(usuariosMusicas);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.get("/usuarios/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicas = yield UsuarioMusicaService_1.UsuarioMusicaService.getMusicaComUsuario(request.params.id);
        response.status(statusHTTP_1.statusHTTP.success).send(musicas);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.get("/musicas/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield UsuarioMusicaService_1.UsuarioMusicaService.getUsuarioComMusica(request.params.id);
        response.status(statusHTTP_1.statusHTTP.success).send(usuarios);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.post("/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        yield UsuarioMusicaService_1.UsuarioMusicaService.postUsuarioMusica(request.user.id, request.params.id);
        response.status(statusHTTP_1.statusHTTP.created).json({ "message": "Relacionamento de Usuário e Música criado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.delete("/musicas/:id", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MusicaService_1.MusicaService.deleteMusica(request.params.id);
        response.status(statusHTTP_1.statusHTTP.no_content).json({ "message": "Relacionamento de Usuário e Música deletado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
