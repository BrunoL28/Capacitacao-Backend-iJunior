import { hash } from 'bcrypt';
import { Attributes } from 'sequelize';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { cargo } from '../../../../utils/constants/cargo';
import { Usuario, UsuarioInterface } from '../models/Usuario';
import { PayloadParams } from '../types/PayloadParams';

class UsuarioServiceClass {
    
    /**
     * Função que encripta uma senha utilizando algoritmo hash.
     * @param senha 
     * @returns senha: string
     */

    async encryptPassword(senha: string) : Promise<string> {
        const saltRounds = 10;
        const encryptedPassword = await hash(senha, saltRounds);
        return encryptedPassword;
    }

    /**
     * Função que retorna todos os usuários existentes.
     * @returns Usuario
     */

    async retorno() {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            throw new QueryError('Nenhum usuário encontrado');
        }
        return usuarios;
    }
    
    /**
     * Função que verifica se um usuário já existe checando seu nome.
     * @param {*} body 
     * @returns boolean
     */

    async verificacao(body: Attributes<UsuarioInterface>) : Promise<boolean> {
        const usuario = await Usuario.findOne( { where: { email: body.email }} );
        return !!usuario;
    }

    /**
     * Função responsável por criar um usuário, caso seus atributos não estejam vazios
     * ou ele não exista.
     * @param {*} body 
     */

    async criacao(body: Attributes<UsuarioInterface>) : Promise<void> {
        if (body.cargo === cargo.ADMIN) {
            throw new PermissionError('Não é possível criar uma conta com o cargo de administrador!');
        }
        if (body.nome === '' || body.email === '' || body.senha == '' || body.cargo === '') {
            throw new QueryError('Informações de artista incompletas');
        }
        if (await this.verificacao(body)) {
            throw new InvalidParamError('Esse usuário já existe');
        }
        const usuario = {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            cargo: body.cargo,
        };

        usuario.senha = await this.encryptPassword(usuario.senha);
        await Usuario.create(usuario);
    }

    /**
     * Função que encontra um usuário por seu id.
     * @param {*} id 
     * @returns Usuario
     */

    async encontrar(id: string) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new QueryError('Usuário não foi encontrado');
        }
        return usuario;
    }

    /**
     * Função que atualiza informações de um usuário, verificando antes se o id passado como parâmetro está
     * ligado a um usuário, e depois se as entradas sao válidas. Após isso, atualiza o usuário com as informações
     * passadas em att_usuario e retorna um usuario com os atributos atualizados.
     * @param {*} id 
     * @param {*} att_usuario 
     * @returns Usuario
     */

    async atualizar(id: string, att_usuario: UsuarioInterface, usuarioLogado: PayloadParams) {
        if (usuarioLogado.cargo !== cargo.ADMIN && usuarioLogado.id !== id) {
            throw new NotAuthorizedError('Você não possui a permissão necessária para editar outro usuário!');
        }
        if (att_usuario.cargo && usuarioLogado.cargo !== cargo.ADMIN && usuarioLogado.cargo !== att_usuario.cargo ) {
            throw new NotAuthorizedError('Você não possui a permissão necessária para editar seu próprio cargo!');
        }
        const usuario = await this.encontrar(id);
        if ( att_usuario.nome === '' || att_usuario.email === '' || att_usuario.senha === '' || att_usuario.cargo === '') {
            throw new QueryError('Informações de usuário incompletas');
        }
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        if(att_usuario.senha) {
            att_usuario.senha = await this.encryptPassword(att_usuario.senha);
        }

        const usuarioAtualizado = await usuario.update(att_usuario);
        return usuarioAtualizado;
    }

    /**
     * Função que deleta um usuário com base em seu id.
     * @param id 
     */

    async deletar(id: string, selfId: string) {
        if (selfId === id) {
            throw new PermissionError('Você não pode deletar seu próprio usuário!');
        }
        const usuario = await this.encontrar(id);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        await usuario.destroy();
    }
}

export const UsuarioService = new UsuarioServiceClass();