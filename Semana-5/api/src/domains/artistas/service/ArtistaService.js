const Artista = require('../models/Artista');
const Musica = require('../../musicas/models/Musica');

class ArtistaService {
    
    async retorno() {
        return await Artista.findAll();
    }
    
    async criacao(body) {
        try {
            const artista = await Artista.findOne( { where: {nome: body.nome }} );
            if (artista) {
                throw new Error('Esse artista já existe');
            }
            await Artista.create(body);
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_por_id(id) {
        try {
            const artista = await Artista.findByPk(id);
            if (!artista) {
                throw new Error('Artista não foi encontrado');
            }
            return artista;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_por_nome(nome) {
        try {
            const artista = await Artista.findOne({ where: { nome: `${nome}`}});
            if(!artista){
                throw new Error('Artista não foi encontrado');
            }
            return artista;
        }catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_musica(nome) {
        try {
            const artista = await Artista.findOne({ where: { nome: nome}, include: [Musica]} );
            if(!artista) {
                throw new Error('Artista não foi econtrado');
            }
            return artista.Musicas;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async atualizar(id, att_artista) {
        try {
            const artista = await this.encontrar_por_id(id);
            const artistaAtualizado = await artista.update(att_artista);
            return artistaAtualizado;
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async deletar_por_id(id) {
        try {
            const artista = await this.encontrar_por_id(id);
            await artista.destroy();
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async deletar_por_nome(nome) {
        try {
            const artista = await this.encontrar_por_nome(nome);
            await artista.destroy();
        } catch (erro) {
            throw new Error(erro.message);
        }
    }
}

module.exports = new ArtistaService;