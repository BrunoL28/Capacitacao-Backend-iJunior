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
exports.MusicaService = exports.MusicaServiceClass = void 0;
const QueryError_1 = require("../../../../errors/QueryError");
const Musica_1 = require("../models/Musica");
/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Música, que serão utilizados nos controllers.
 */
class MusicaServiceClass {
    /**
     * Função que retorna todas as músicas.
     * @returns Musica
     */
    getMusicas() {
        return __awaiter(this, void 0, void 0, function* () {
            const musicas = yield Musica_1.Musica.findAll();
            if (!musicas) {
                throw new QueryError_1.QueryError("Nenhuma música foi encontrada!");
            }
            return musicas;
        });
    }
    /**
     * Função que busca uma música pelo seu nome.
     * @param {*} nome
     * @returns Musica
     */
    getMusicaTitulo(titulo) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield Musica_1.Musica.findOne({ where: { titulo: `${titulo}` } });
            if (!musica) {
                throw new QueryError_1.QueryError("Nenhuma música foi encontrada com esse nome!");
            }
            return musica;
        });
    }
    /**
     * Função que busca uma música pelo seu id.
     * @param {*} id
     * @returns Musica
     */
    getMusicaId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield Musica_1.Musica.findByPk(id);
            if (!musica) {
                throw new QueryError_1.QueryError("Nenhuma música foi encontrada com esse id!");
            }
            return musica;
        });
    }
    /**
     * Função que cria uma música.
     * @param {*} body
     */
    postMusica(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.artistaId === "" || body.categoria === "" || body.foto === "" || body.titulo === "") {
                throw new QueryError_1.QueryError("Informações de música incorretas!");
            }
            yield Musica_1.Musica.create(body);
        });
    }
    /**
     * Função que atualiza os parãmetros de uma música
     * já criada.
     * @param {*} id
     * @param {*} att_musica
     */
    putMusica(id, att_musica) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield this.getMusicaId(id);
            if (att_musica.artistaId === "" || att_musica.categoria === "" ||
                att_musica.foto === "" || att_musica.titulo === "") {
                throw new QueryError_1.QueryError("As informações de música estão incompletas!");
            }
            yield musica.update(att_musica);
        });
    }
    /**
     * Função que encontra uma música por seu
     * id e a deleta.
     * @param {*} id
     */
    deleteMusica(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield this.getMusicaId(id);
            yield musica.destroy();
        });
    }
}
exports.MusicaServiceClass = MusicaServiceClass;
exports.MusicaService = new MusicaServiceClass();
