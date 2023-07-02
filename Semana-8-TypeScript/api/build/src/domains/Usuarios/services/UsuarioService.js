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
exports.UsuarioService = exports.UsuarioServiceClass = void 0;
const bcrypt_1 = require("bcrypt");
const NotAuthorizedError_1 = require("../../../../errors/NotAuthorizedError");
const PermissionError_1 = require("../../../../errors/PermissionError");
const QueryError_1 = require("../../../../errors/QueryError");
const cargos_1 = require("../../../../utils/constants/cargos");
const Usuario_1 = require("../models/Usuario");
/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Usuário, que serão utilizados nos controllers.
 */
class UsuarioServiceClass {
    /**
         * Função que recebe uma senha e a decodifica por meio de
         * um algoritmo hash.
         * @param {*} password
         * @returns string
         */
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const encryptPassword = yield (0, bcrypt_1.hash)(password, saltRounds);
            return encryptPassword;
        });
    }
    /**
     * Função que retorna todos os usuários.
     * @returns Usuario
     */
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield Usuario_1.Usuario.findAll();
            if (!usuarios) {
                throw new QueryError_1.QueryError("Nenhum usuário foi encontrado!");
            }
            return usuarios;
        });
    }
    /**
     * Função que busca um usuário pelo seu id.
     * @param {*} id
     * @returns Usuario
     */
    getUsuarioId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield Usuario_1.Usuario.findByPk(id);
            if (!usuario) {
                throw new QueryError_1.QueryError("Nenhum usuário foi encontrado com esse id!");
            }
            return usuario;
        });
    }
    /**
     * Função que cria um usuário.
     * @param {*} body
     */
    postUsuario(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.cargo == cargos_1.cargos.admin) {
                throw new PermissionError_1.PermissionError("Não é possível criar um usuário com o cargo de admin!");
            }
            const usuario = yield Usuario_1.Usuario.findOne({ where: { email: body.email } });
            if (usuario) {
                throw new QueryError_1.QueryError("Esse e-mail já está em nossa base de dados!");
            }
            else {
                const usuario = {
                    cargo: body.cargo,
                    email: body.email,
                    nome: body.nome,
                    senha: body.senha,
                };
                usuario.senha = yield this.encryptPassword(body.senha);
                yield Usuario_1.Usuario.create(usuario);
            }
        });
    }
    /**
     * Função que atualiza os parâmetros de um usuário.
     * @param {*} id
     * @param {*} att_usuario
     */
    putUsuario(id, att_usuario, usuarioLogado) {
        return __awaiter(this, void 0, void 0, function* () {
            if (usuarioLogado.cargo != cargos_1.cargos.admin && usuarioLogado.id != id) {
                throw new NotAuthorizedError_1.NotAuthorizedError("Você não possui permissão suficiente para editar outro usuário!");
            }
            if (att_usuario.cargo && usuarioLogado.cargo != cargos_1.cargos.admin && usuarioLogado.cargo != att_usuario.cargo) {
                throw new NotAuthorizedError_1.NotAuthorizedError("Você não pode editar seu próprio usuário!");
            }
            if (att_usuario.cargo === "" || att_usuario.email === "" || att_usuario.nome === "" || att_usuario.senha === "") {
                throw new QueryError_1.QueryError("As informações de usuário estão incompletas!");
            }
            const usuario = yield this.getUsuarioId(id);
            if (att_usuario.senha) {
                att_usuario.senha = yield this.encryptPassword(att_usuario.senha);
            }
            yield usuario.update(att_usuario, { where: { id: id } });
        });
    }
    /**
     * Função que recebe um id e deleta o usuário
     * relativo à esse id.
     * @param {*} id
     */
    deleteUsuario(id, logged_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (logged_id == id) {
                throw new PermissionError_1.PermissionError("Você não pode deletar seu próprio usuário!");
            }
            const usuario = yield this.getUsuarioId(id);
            yield usuario.destroy();
        });
    }
}
exports.UsuarioServiceClass = UsuarioServiceClass;
exports.UsuarioService = new UsuarioServiceClass();
