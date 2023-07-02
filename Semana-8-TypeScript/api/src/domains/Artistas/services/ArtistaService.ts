import { Attributes } from "sequelize";
import { QueryError } from "../../../../errors/QueryError";
import { Artista, ArtistaInterface } from "../models/Artista";

/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Artista, que serão utilizados nos controllers.
 */

export class ArtistaServiceClass {

    /**
         * Função que retorna todos os artistas.
         * @returns Artista
         */

    async getArtistas() {
        const artistas = await Artista.findAll();
        if ( !artistas ) {
            throw new QueryError( "Nenhum artista foi encontrado!" );
        }
        return artistas;
    }

    /**
     * Função que busca um artista pelo seu nome.
     * @param {*} nome 
     * @returns Artista
     */

    async getArtistaNome( nome: string ) {
        const artista = await Artista.findOne( { where: { nome: `${nome}` } } );
        if ( !artista ) {
            throw new QueryError( "Nenhum artista foi encontrado com esse nome!" );
        }
        return artista;
    }

    /**
     * Função que busca um artista pelo seu id.
     * @param {*} id
     * @returns Artista
     */

    async getArtistaId( id: string ) {
        const artista = await Artista.findByPk( id );
        if ( !artista ) {
            throw new QueryError( "Nenhum artista foi encontrado com esse id!" );
        }
        return artista;
    }

    /**
     * Função que cria um artista.
     * @param {*} body 
     */

    async postArtista( body: Attributes<ArtistaInterface> ) {
        if ( body.foto === "" || body.nacionalidade === "" || body.nome === "" ) {
            throw new QueryError( "Informações de artista incorretas!" );
        }
        await Artista.create( body );
    }

    /**
     * Função que atualiza parâmetros de um artista
     * já criado.
     * @param {*} id 
     * @param {*} att_artista 
     */

    async putArtista( id: string, att_artista: Attributes<ArtistaInterface> ) {
        const artista = await this.getArtistaId( id );
        if ( att_artista.foto === "" || att_artista.nacionalidade === "" || att_artista.nome === "" ) {
            throw new QueryError( "As informações de artista estão incompletas!" );
        }
        await artista.update( att_artista );
    }

    /**
     * Função que encontra um artista por seu id e 
     * o deleta.
     * @param {*} id 
     */

    async deleteArtista( id: string ) {
        const artista = await this.getArtistaId( id );
        await artista.destroy();
    }

}

export const ArtistaService = new ArtistaServiceClass();