const Artista = require('../models/Artista');
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');

class ArtistaService {
    
    /**
     * Função que retorna todos os artistas existentes.
     * @returns Artista
     */

    async retorno() {
        const artistas = await Artista.findAll();
        if( artistas.lenght === 0) {
            throw new QueryError('Nenhum artista encontrado');
        } 
        return artistas;
    }

    /**
     * Função que verifica se um artista já existe checando seu nome.
     * @param {*} body 
     * @returns boolean
     */

    async verificacao(body) {
        let check = false;
        const artista = await Artista.findOne( { where: {nome: body.nome }} );
        if (artista) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }
    
    /**
     * Função responsável por criar um artista, caso seus atributos não estejam vazios
     * ou ele não exista.
     * @param {*} body 
     */

    async criacao(body) {
        if (body.nome === '' || body.nacionalidade === '' || body.foto === '') {
            throw new QueryError('Informações de artista incompletas');
        }
        if (this.verificacao(body) === true) {
            throw new InvalidParamError('Esse artista já existe');
        }
        await Artista.create(body);
    }

    /**
     * Função que encontra um artista por seu id
     * @param {*} id 
     * @returns Artista
     */

    async encontrar(id) {
        const artista = await Artista.findByPk(id);
        if (!artista) {
            throw new QueryError('Artista não foi encontrado');
        }
        return artista;
    }

    /**
     * Função que atualiza informações de um artista, verificando antes se o id passado como parâmetro está
     * ligado a um artista, e depois se as entradas sao válidas. Após isso, atualiza o artista com as informações
     * passadas em att_artista e retorna um artista com os atributos atualizados.
     * @param {*} id 
     * @param {*} att_artista 
     * @returns Artista
     */

    async atualizar(id, att_artista) {
        const artista = await this.encontrar(id);
        if (artista === null) {
            throw new InvalidParamError('Nenhum artista encontrado');
        }
        if (att_artista.nome === '' || att_artista.nacionalidade === '' || att_artista.foto === '') {
            throw new QueryError('Informações de artista incompletas');
        }
        const artistaAtualizado = await artista.update(att_artista, { where: { id: id }});
        return artistaAtualizado;
    }

    /**
     * Função que recebe um id como parâmetro e deleta o artista ligado a esse id.
     * @param {*} id 
     */

    async deletar(id) {
        const artista = await this.encontrar(id);
        if(artista === null) {
            throw new InvalidParamError('Nenhum artista encontrado');
        }
        await artista.destroy();
    }
}

module.exports = new ArtistaService;