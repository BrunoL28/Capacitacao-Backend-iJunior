const Artista = require('../models/Artista');

class ArtistaService {
    
    async retorno() {
        await Artista.findAll();
    }
    
    async criacao(body) {
        await Artista.create(body);
    }

    async encontrar(id) {
        try {
            const artista = await Artista.findByPk(id);
            if (!artista) {
                throw new Error('Usuário não foi encontrado');
            }
            return artista;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async atualizar(id, att_artista) {
        try {
            const artista = await this.encontrar(id);
            const artistaAtualizado = await artista.update(att_artista);
            return artistaAtualizado;
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }

    async deletar(id) {
        try {
            const artista = await this.encontrar(id);
            await artista.destroy();
        } catch (erro) {
            throw new Error(erro.mensage);
        }
    }
}

module.exports = new ArtistaService;