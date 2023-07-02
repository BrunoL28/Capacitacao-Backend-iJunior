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
exports.UsuarioMusicaService = exports.UsuarioMusicaServiceClass = void 0;
const QueryError_1 = require("../../../../errors/QueryError");
const Musica_1 = require("../../Musicas/models/Musica");
const MusicaService_1 = require("../../Musicas/services/MusicaService");
const Usuario_1 = require("../../Usuarios/models/Usuario");
const UsuarioService_1 = require("../../Usuarios/services/UsuarioService");
const UsuarioMusica_1 = require("../models/UsuarioMusica");
/**
 * Classe que implementa funções e métodos importantes para
 * a entidade UsuárioMúsica, que serão utilizados nos controllers.
 */
class UsuarioMusicaServiceClass {
    /**
     * Função que retorna todos os usuários relacionados a
     * músicas.
     * @returns UsuarioMusica
     */
    getUsuariosMusicas() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioMusica = yield UsuarioMusica_1.UsuarioMusica.findAll();
            if (!usuarioMusica) {
                throw new QueryError_1.QueryError("Nenhum dado encontrado na relação!");
            }
            return usuarioMusica;
        });
    }
    /**
     * Função que obtém as músicas relacionadas a um
     * usuário e as retorna.
     * @param {*} idUsuario
     * @returns Musica
     */
    getMusicaComUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const musicas = yield Musica_1.Musica.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt",],
                },
                include: {
                    model: Usuario_1.Usuario,
                    where: {
                        id: idUsuario,
                    },
                    attributes: ["id"],
                    through: {
                        attributes: [],
                    },
                },
            });
            return musicas;
        });
    }
    /**
     * Função que obtém os usuários relacionados a uma
     * música, e os retorna.
     * @param {*} idMusica
     * @returns
     */
    getUsuarioComMusica(idMusica) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield Usuario_1.Usuario.findAll({
                attributes: {
                    exclude: ["senha", "createdAt", "updatedAt",],
                },
                include: {
                    model: Musica_1.Musica,
                    where: {
                        id: idMusica,
                    },
                    attributes: ["id"],
                    through: {
                        attributes: [],
                    },
                },
            });
            return usuarios;
        });
    }
    /**
     * Função que cria um novo objeto UsuarioMusica.
     * @param {*} idMusica
     * @param {*} idUsuario
     */
    postUsuarioMusica(idMusica, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield MusicaService_1.MusicaService.getMusicaId(idMusica);
            const usuario = yield UsuarioService_1.UsuarioService.getUsuarioId(idUsuario);
            yield UsuarioMusica_1.UsuarioMusica.create({ idMusica: musica.id, idUsuario: usuario.id, });
        });
    }
    /**
     * Função que deleta um objeto UsuarioMusica.
     * @param {*} idMusica
     * @param {*} idUsuario
     */
    deleteUsuarioMusica(idMusica, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const musica = yield MusicaService_1.MusicaService.getMusicaId(idMusica);
            const usuario = yield UsuarioService_1.UsuarioService.getUsuarioId(idUsuario);
            yield UsuarioMusica_1.UsuarioMusica.destroy({
                where: {
                    idMusica: musica.id,
                    idUsuario: usuario.id,
                },
            });
        });
    }
}
exports.UsuarioMusicaServiceClass = UsuarioMusicaServiceClass;
exports.UsuarioMusicaService = new UsuarioMusicaServiceClass();
