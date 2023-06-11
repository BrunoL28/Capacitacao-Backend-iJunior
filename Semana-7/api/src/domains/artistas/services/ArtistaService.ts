import { Attributes } from 'sequelize/types';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import { Artista, ArtistaInterface } from '../models/Artista';

class ArtistaServiceClass {

    /**
     * Função que retorna todos os artistas existentes.
     * @returns Artista
     */

    async retorno() {
        const artistas = await Artista.findAll();
        if (artistas.length === 0) {
            throw new QueryError('Nenhum artista encontrado!');
        }
        return artistas;
    }

    /**
     * Função que verifica se um artista já existe checando seu nome.
     * @param body 
     * @returns boolean
     */

    async verificacao(body: Attributes<ArtistaInterface>) : Promise<boolean> {
        let check = false;
        const artista = await Artista.findOne({ where: { nome: body.nome } });
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
     * @param body 
     */

    async criacao(body: Attributes<ArtistaInterface>) {
        if (body.nome === '' || body.nacionalidade === '' || body.foto === '') {
            throw new QueryError('Informações de artista incompletas!');
        }
        if (await this.verificacao(body) === true) {
            throw new InvalidParamError('Esse artista já existe!');
        }
        const artist = {
            nome: body.nome,
            nacionalidade: body.nacionalidade,
            foto: body.foto,
        };
        await Artista.create(artist);
    }

    /**
     * Função que encontra um artista por seu id
     * @param id 
     * @returns Artista
     */

    async encontrar(id: string) : Promise<ArtistaInterface> {
        const artista = await Artista.findByPk(id);
        if (!artista) {
            throw new QueryError('Artista não foi encontrado!');
        }
        return artista;
    }

    /**
     * Função que atualiza informações de um artista, verificando antes se o id passado como parâmetro está
     * ligado a um artista, e depois se as entradas sao válidas. Após isso, atualiza o artista com as informações
     * passadas em att_artista e retorna um artista com os atributos atualizados.
     * @param id 
     * @param att_artista 
     * @returns Artista
     */

    async atualizar(id: string, att_artista: Attributes<ArtistaInterface>) {
        const artista = await this.encontrar(id);
        if (artista === null) {
            throw new InvalidParamError('Nenhum artista encontrado!');
        }
        if (att_artista.nome === '' || att_artista.nacionalidade === '' || att_artista.foto === '') {
            throw new QueryError('Informações de Artista incompletas!');
        }
        const artistaAtualizado = await Artista.update(att_artista, { where: { id: id }});
        return artistaAtualizado;
    }

    /**
     * Função que recebe um id como parâmetro e deleta o artista ligado a esse id. 
     * @param id 
     */

    async deletar(id: string) {
        const artista = await this.encontrar(id);
        if (artista === null) {
            throw new InvalidParamError('Nenhum Artista encontrado!');
        }
        await artista.destroy();
    }
}

export const ArtistaService = new ArtistaServiceClass();