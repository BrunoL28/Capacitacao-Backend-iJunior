const Musica = require('../models/Musica');

class MusicaService {
    async retorno() {
        await Musica.findAll();
    }

    async criacao(body) {
        await Musica.create(body);
    }

    async encontrar(id) {
        try {
            const musica = await Musica.findByPk(id);
            if (!musica) {
                throw new Error('Música não foi encontrada');
            }
            return musica;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async atualizar(id, att_musica) {
        try {
            const musica = await this.encontrar(id);
            const musicaAtualizada = await musica.update(att_musica);
            return musicaAtualizada;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async deletar(id) {
        try {
            const musica = await this.encontrar(id);
            await musica.destroy();
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }
}

module.exports = new MusicaService;