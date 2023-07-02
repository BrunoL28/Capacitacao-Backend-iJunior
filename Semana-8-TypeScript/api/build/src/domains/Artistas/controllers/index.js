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
const ArtistaService_1 = require("../services/ArtistaService");
exports.router = (0, express_1.Router)();
exports.router.get("/list", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistas = yield ArtistaService_1.ArtistaService.getArtistas();
        response.status(statusHTTP_1.statusHTTP.success).send(artistas);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.get("/list/:nome", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artista = yield ArtistaService_1.ArtistaService.getArtistaNome(request.params.nome);
        response.status(statusHTTP_1.statusHTTP.success).send(artista);
    }
    catch (error) {
        next(error);
    }
}));
exports.router.post("/add", auth_middleware_1.verifyJWT, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ArtistaService_1.ArtistaService.postArtista(request.body);
        return response.status(statusHTTP_1.statusHTTP.created).json({ "message": "Artista criado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.put("/:id", auth_middleware_1.verifyJWT, (0, auth_middleware_1.checkRole)([cargos_1.cargos.admin]), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ArtistaService_1.ArtistaService.putArtista(request.params.id, request.body);
        response.status(statusHTTP_1.statusHTTP.success).json({ "message": "Artista atualizado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.router.delete("/delete/:id", auth_middleware_1.verifyJWT, (0, auth_middleware_1.checkRole)([cargos_1.cargos.admin]), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ArtistaService_1.ArtistaService.deleteArtista(request.params.id);
        response.status(statusHTTP_1.statusHTTP.no_content).json({ "message": "Artista deletado com sucesso!" }).end();
    }
    catch (error) {
        next(error);
    }
}));
