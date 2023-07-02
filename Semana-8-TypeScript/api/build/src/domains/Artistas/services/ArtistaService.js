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
exports.ArtistaService = exports.ArtistaServiceClass = void 0;
const QueryError_1 = require("../../../../errors/QueryError");
const Artista_1 = require("../models/Artista");
/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Artista, que serão utilizados nos controllers.
 */
class ArtistaServiceClass {
    /**
         * Função que retorna todos os artistas.
         * @returns Artista
         */
    getArtistas() {
        return __awaiter(this, void 0, void 0, function* () {
            const artistas = yield Artista_1.Artista.findAll();
            if (!artistas) {
                throw new QueryError_1.QueryError("Nenhum artista foi encontrado!");
            }
            return artistas;
        });
    }
    /**
     * Função que busca um artista pelo seu nome.
     * @param {*} nome
     * @returns Artista
     */
    getArtistaNome(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const artista = yield Artista_1.Artista.findOne({ where: { nome: `${nome}` } });
            if (!artista) {
                throw new QueryError_1.QueryError("Nenhum artista foi encontrado com esse nome!");
            }
            return artista;
        });
    }
    /**
     * Função que busca um artista pelo seu id.
     * @param {*} id
     * @returns Artista
     */
    getArtistaId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artista = yield Artista_1.Artista.findByPk(id);
            if (!artista) {
                throw new QueryError_1.QueryError("Nenhum artista foi encontrado com esse id!");
            }
            return artista;
        });
    }
    /**
     * Função que cria um artista.
     * @param {*} body
     */
    postArtista(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.foto === "" || body.nacionalidade === "" || body.nome === "") {
                throw new QueryError_1.QueryError("Informações de artista incorretas!");
            }
            yield Artista_1.Artista.create(body);
        });
    }
    /**
     * Função que atualiza parâmetros de um artista
     * já criado.
     * @param {*} id
     * @param {*} att_artista
     */
    putArtista(id, att_artista) {
        return __awaiter(this, void 0, void 0, function* () {
            const artista = yield this.getArtistaId(id);
            if (att_artista.foto === "" || att_artista.nacionalidade === "" || att_artista.nome === "") {
                throw new QueryError_1.QueryError("As informações de artista estão incompletas!");
            }
            yield artista.update(att_artista);
        });
    }
    /**
     * Função que encontra um artista por seu id e
     * o deleta.
     * @param {*} id
     */
    deleteArtista(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artista = yield this.getArtistaId(id);
            yield artista.destroy();
        });
    }
}
exports.ArtistaServiceClass = ArtistaServiceClass;
exports.ArtistaService = new ArtistaServiceClass();
