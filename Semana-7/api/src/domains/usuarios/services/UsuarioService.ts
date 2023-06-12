import { Attributes } from 'sequelize';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { Usuario, UsuarioInterface } from '../models/Usuario';

class UsuarioServiceClass {
    
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
        let check = false;
        const usuario = await Usuario.findOne( { where: { email: body.email }} );
        if (usuario) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }

    /**
     * Função responsável por criar um usuário, caso seus atributos não estejam vazios
     * ou ele não exista.
     * @param {*} body 
     */

    async criacao(body: Attributes<UsuarioInterface>) {
        if (body.nome === '' || body.email === '' || body.senha == '' || body.cargo === '') {
            throw new QueryError('Informações de artista incompletas');
        }

        if (await this.verificacao(body) === true) {
            throw new InvalidParamError('Esse usuário já existe');
        } else {
            const usuario = {
                nome: body.nome,
                email: body.email,
                senha: body.senha,
                cargo: body.cargo,
            };

            await Usuario.create(usuario);
        }
    }

    /**
     * Função que encontra um usuário por seu id.
     * @param {*} id 
     * @returns Usuario
     */

    async encontrar(id: string) : Promise<UsuarioInterface>{
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

    async atualizar(id: string, att_usuario: Attributes<UsuarioInterface>) {
        const usuario = await this.encontrar(id);
        if (usuario.cargo !== 'user') {
            throw new PermissionError('Cargo inválido');
        }
        if ( att_usuario.nome === '' || att_usuario.email === '' || att_usuario.senha === '' || att_usuario.cargo === '') {
            throw new QueryError('Informações de usuário incompletas');
        }
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        const usuarioAtualizado = await usuario.update(att_usuario, { where: { id: id } });
        return usuarioAtualizado;
    }

    /**
     * Função que deleta um usuário com base em seu id.
     * @param id 
     */

    async deletar(id: string) {
        const usuario = await this.encontrar(id);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        await usuario.destroy();
    }
}

export const UsuarioService = new UsuarioServiceClass();