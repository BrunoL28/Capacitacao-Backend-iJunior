const Musica = require('../models/Musica');

class MusicaService {

    async retorno() {
        return await Musica.findAll();
    }

    async criacao(body) {
        try {
            const musica = await Musica.findOne( { where: {titulo: body.nome} } );
            if (musica) {
                throw new Error('Essa musica já existe');
            }
            await Musica.create(body);
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_por_id(id) {
        try {
            const musica = await Musica.findByPk(id);
            if (!musica) {
                throw new Error('Música não foi encontrada');
            }
            return musica;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_por_titulo(titulo) {
        try {
            const musica = await Musica.findOne( { where: {titulo: titulo} } );
            if (!musica) {
                throw new Error('Musica não foi encontrada');
            }
            return musica;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async atualizar(id, att_musica) {
        try {
            const musica = await this.encontrar_por_id(id);
            const musicaAtualizada = await musica.update(att_musica);
            return musicaAtualizada;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async deletar_por_id(id) {
        try {
            const musica = await this.encontrar_por_id(id);
            await musica.destroy();
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async deletar_por_titulo(titulo) {
        try {
            const musica = await this.encontrar_por_titulo(titulo);
            await musica.destroy();
        } catch (erro) {
            throw new Error(erro.message);
        }
    }
}

module.exports = new MusicaService;