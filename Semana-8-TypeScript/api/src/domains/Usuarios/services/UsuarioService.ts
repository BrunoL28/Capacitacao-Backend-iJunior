import { hash } from "bcrypt";
import { Attributes } from "sequelize";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";
import { PermissionError } from "../../../../errors/PermissionError";
import { QueryError } from "../../../../errors/QueryError";
import { cargos } from "../../../../utils/constants/cargos";
import { Usuario, UsuarioInterface } from "../models/Usuario";
import { PayloadParams } from "../types/PayloadParams";

/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Usuário, que serão utilizados nos controllers.
 */

export class UsuarioServiceClass {

    /**
         * Função que recebe uma senha e a decodifica por meio de 
         * um algoritmo hash.
         * @param {*} password 
         * @returns string
         */

    async encryptPassword( password: string ) {
        const saltRounds = 10;
        const encryptPassword = await hash( password, saltRounds );
        return encryptPassword;
    }

    /**
     * Função que retorna todos os usuários.
     * @returns Usuario
     */

    async getUsuarios() {
        const usuarios = await Usuario.findAll();
        if ( !usuarios ) {
            throw new QueryError( "Nenhum usuário foi encontrado!" );
        }
        return usuarios;
    }

    /**
     * Função que busca um usuário pelo seu id.
     * @param {*} id 
     * @returns Usuario
     */

    async getUsuarioId( id: string ) {
        const usuario = await Usuario.findByPk( id );
        if ( !usuario ) {
            throw new QueryError( "Nenhum usuário foi encontrado com esse id!" );
        }
        return usuario;
    }

    /**
     * Função que cria um usuário.
     * @param {*} body 
     */

    async postUsuario( body: Attributes<UsuarioInterface> ) {
        if ( body.cargo == cargos.admin ) {
            throw new PermissionError( "Não é possível criar um usuário com o cargo de admin!" );
        }
        const usuario = await Usuario.findOne( { where: { email: body.email } } );
        if ( usuario ) {
            throw new QueryError( "Esse e-mail já está em nossa base de dados!" );
        } else {
            const usuario = {
                cargo: body.cargo,
                email: body.email,
                nome: body.nome,
                senha: body.senha,
            };
            usuario.senha = await this.encryptPassword( body.senha );
            await Usuario.create( usuario );
        }
    }

    /**
     * Função que atualiza os parâmetros de um usuário.
     * @param {*} id 
     * @param {*} att_usuario 
     */

    async putUsuario( id: string, att_usuario: Attributes<UsuarioInterface>, usuarioLogado: PayloadParams ) {
        if ( usuarioLogado.cargo != cargos.admin && usuarioLogado.id != id ) {
            throw new NotAuthorizedError( "Você não possui permissão suficiente para editar outro usuário!" );
        }
        if ( att_usuario.cargo && usuarioLogado.cargo != cargos.admin && usuarioLogado.cargo != att_usuario.cargo ) {
            throw new NotAuthorizedError( "Você não pode editar seu próprio usuário!" );
        }
        if ( att_usuario.cargo === "" || att_usuario.email === "" || att_usuario.nome === "" || att_usuario.senha === "" ) {
            throw new QueryError( "As informações de usuário estão incompletas!" );
        }
        const usuario = await this.getUsuarioId( id );
        if ( att_usuario.senha ) {
            att_usuario.senha = await this.encryptPassword( att_usuario.senha );
        }
        await usuario.update( att_usuario );
    }

    /**
     * Função que recebe um id e deleta o usuário 
     * relativo à esse id.
     * @param {*} id 
     */

    async deleteUsuario( id: string, logged_id: string ) {
        if ( logged_id == id ) {
            throw new PermissionError( "Você não pode deletar seu próprio usuário!" );
        }
        const usuario = await this.getUsuarioId( id );
        await usuario.destroy();
    }

}

export const UsuarioService = new UsuarioServiceClass();