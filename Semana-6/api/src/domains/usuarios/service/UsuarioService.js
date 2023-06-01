const Usuario = require('../models/Usuario');
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');
const PermissionError = require('../../../../errors/PermissionError');
class UsuarioService {
    
    /**
     * Função que retorna todos os usuários existentes.
     * @returns Usuario
     */

    async retorno() {
        const usuarios = await Usuario.findAll();
        if (usuarios.lenght === 0) {
            throw new QueryError('Nenhum usuário encontrado');
        }
        return usuarios;
    }
    
    /**
     * Função que verifica se um usuário já existe checando seu nome.
     * @param {*} body 
     * @returns boolean
     */

    async verificacao(body) {
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

    async criacao(body) {
        if (body.nome === '' || body.email === '' || body.senha == '' || body.cargo === '') {
            throw new QueryError('Informações de artista incompletas');
        }
        if (this.verificacao(body) === true) {
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

    async encontrar(id) {
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

    async atualizar(id, att_usuario) {
        const usuario = await this.encontrar(id);
        if (usuario.cargo !== 'user') {
            throw new PermissionError('Cargo inválido');
        }
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        if ( att_usuario.nome === '' || att_usuario.email === '' || att_usuario.senha === '' || att_usuario.cargp === '') {
            throw new QueryError('Informações de usuário incompletas');
        }
        const usuarioAtualizado = await usuario.update(att_usuario, { where: { id: id } });
        return usuarioAtualizado;
    }

    async deletar(id) {
        const usuario = await this.encontrar(id);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário foi encontrado');
        }
        await usuario.destroy();
    }
}

module.exports = new UsuarioService;