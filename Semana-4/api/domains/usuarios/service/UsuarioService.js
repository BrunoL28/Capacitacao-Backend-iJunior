const Usuario = require('../models/Usuario');

class UsuarioService {
    
    async retorno() {
        await Usuario.findAll();
    }
    
    async criacao(body) {
        await Usuario.create(body);
    }

    async encontrar(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuário não foi encontrado');
            }
            return usuario;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async atualizar(id, att_usuario) {
        try {
            const usuario = await this.encontrar(id);
            const usuarioAtualizado = await usuario.update(att_usuario);
            return usuarioAtualizado;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async deletar(id) {
        try {
            const usuario = await this.encontrar(id);
            await usuario.destroy();
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }
}

module.exports = new UsuarioService;