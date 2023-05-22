const Musica = require('../models/Musica');

class MusicaService {

    async retorno() {
        return await Musica.findAll();
    }

    async criacao(body) {
        console.log('Entrou no Service');
        console.log(body);
        return await Musica.create(body);
    }

    async encontrar(id) {
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

    async atualizar(id, att_musica) {
        try {
            const musica = await this.encontrar(id);
            const musicaAtualizada = await musica.update(att_musica);
            return musicaAtualizada;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async deletar(id) {
        try {
            const musica = await this.encontrar(id);
            await musica.destroy();
        } catch (erro) {
            throw new Error(erro.message);
        }
    }
}

module.exports = new MusicaService;