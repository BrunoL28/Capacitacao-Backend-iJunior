import { Attributes } from "sequelize";
import { QueryError } from "../../../../errors/QueryError";
import { Musica, MusicaInterface } from "../models/Musica";

/**
 * Classe que implementa funções e métodos importantes para
 * a entidade Música, que serão utilizados nos controllers.
 */

export class MusicaServiceClass {

    /**
     * Função que retorna todas as músicas.
     * @returns Musica
     */

    async getMusicas() {
        const musicas = await Musica.findAll();
        if ( !musicas ) {
            throw new QueryError( "Nenhuma música foi encontrada!" );
        }
        return musicas;
    }

    /**
     * Função que busca uma música pelo seu nome.
     * @param {*} nome 
     * @returns Musica
     */

    async getMusicaTitulo( titulo: string ) {
        const musica = await Musica.findOne( { where: { titulo: `${titulo}` } } );
        if ( !musica ) {
            throw new QueryError( "Nenhuma música foi encontrada com esse nome!" );
        }
        return musica;
    }

    /**
     * Função que busca uma música pelo seu id.
     * @param {*} id 
     * @returns Musica
     */

    async getMusicaId( id: string ) {
        const musica = await Musica.findByPk( id );
        if ( !musica ) {
            throw new QueryError( "Nenhuma música foi encontrada com esse id!" );
        }
        return musica;
    }

    /**
     * Função que cria uma música.
     * @param {*} body 
     */

    async postMusica( body: Attributes<MusicaInterface> ) {
        if ( body.artistaId === "" || body.categoria === "" || body.foto === "" || body.titulo === "" ) {
            throw new QueryError( "Informações de música incorretas!" );
        }
        await Musica.create( body );
    }

    /**
     * Função que atualiza os parãmetros de uma música
     * já criada.
     * @param {*} id 
     * @param {*} att_musica 
     */

    async putMusica( id: string, att_musica: Attributes<MusicaInterface> ) {
        const musica = await this.getMusicaId( id );
        if ( att_musica.artistaId === "" || att_musica.categoria === "" || 
            att_musica.foto === "" || att_musica.titulo === "" ) {
            throw new QueryError( "As informações de música estão incompletas!" );
        }
        await musica.update( att_musica );
    }

    /**
     * Função que encontra uma música por seu
     * id e a deleta.
     * @param {*} id 
     */

    async deleteMusica( id: string ) {
        const musica = await this.getMusicaId( id );
        await musica.destroy();
    }

}

export const MusicaService = new MusicaServiceClass();