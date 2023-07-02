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
const MusicaService_1 = require("../services/MusicaService");
exports.router = (0, express_1.Router)();
exports.router.get("/list", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicas = yield MusicaService_1.MusicaService.getMusicas();
        response.status(statusHTTP_1.statusHTTP.success).send(musicas);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.get("/list/:nome", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musica = yield MusicaService_1.MusicaService.getMusicaTitulo(request.params.titulo);
        response.status(statusHTTP_1.statusHTTP.success).send(musica);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.post("/add", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MusicaService_1.MusicaService.postMusica(request.body);
        response.status(statusHTTP_1.statusHTTP.created).json({ "message": "Música criada com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.put("/:id", auth_middleware_1.verifyJWT, (0, auth_middleware_1.checkRole)([cargos_1.cargos.admin]), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MusicaService_1.MusicaService.putMusica(request.params.id, request.body);
        response.status(statusHTTP_1.statusHTTP.success).json({ "message": "Música atualizada com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.delete("/delete/:id", auth_middleware_1.verifyJWT, (0, auth_middleware_1.checkRole)([cargos_1.cargos.admin]), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MusicaService_1.MusicaService.deleteMusica(request.params.id);
        response.status(statusHTTP_1.statusHTTP.no_content).json({ "message": "Música deletada com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
