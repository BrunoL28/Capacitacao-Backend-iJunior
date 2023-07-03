import { Musica } from "../../Musicas/models/Musica";
import { MusicaService } from "../../Musicas/services/MusicaService";
import { Usuario } from "../../Usuarios/models/Usuario";
import { UsuarioService } from "../../Usuarios/services/UsuarioService";
import { UsuarioMusica } from "../models/UsuarioMusica";

/**
 * Classe que implementa funções e métodos importantes para
 * a entidade UsuárioMúsica, que serão utilizados nos controllers.
 */

export class UsuarioMusicaServiceClass {

    /**
     * Função que obtém as músicas relacionadas a um
     * usuário e as retorna.
     * @param {*} idUsuario
     * @returns Musica
     */

    async getMusicaComUsuario( idUsuario: string ) {
        const musicas = await Musica.findAll( {
            attributes: {
                exclude: [ "createdAt", "updatedAt", ],
            },
            include: {
                model: Usuario,
                where: {
                    id: idUsuario,
                },
                attributes: [ "id" ],
                through: {
                    attributes: [],
                },
            },
        } );
        return musicas;
    }

    /**
     * Função que obtém os usuários relacionados a uma
     * música, e os retorna.
     * @param {*} idMusica
     * @returns 
     */

    async getUsuarioComMusica( idMusica: string ) {
        const usuarios = await Usuario.findAll( {
            attributes: {
                exclude: [ "senha", "createdAt", "updatedAt", ],
            },
            include: {
                model: Musica,
                where: {
                    id: idMusica,
                },
                attributes: [ "id" ],
                through: {
                    attributes: [],
                },
            },
        } );
        return usuarios;
    }

    /**
     * Função que cria um novo objeto UsuarioMusica.
     * @param {*} idMusica
     * @param {*} idUsuario
     */

    async postUsuarioMusica( idMusica: string, idUsuario: string ) {
        const musica = await MusicaService.getMusicaId( idMusica );
        const usuario = await UsuarioService.getUsuarioId( idUsuario );
        await UsuarioMusica.create( { idMusica: musica.id, idUsuario: usuario.id, } );
    }

    /**
     * Função que deleta um objeto UsuarioMusica.
     * @param {*} idMusica
     * @param {*} idUsuario
     */

    async deleteUsuarioMusica( idMusica: string, idUsuario: string ) {
        const musica = await MusicaService.getMusicaId( idMusica );
        const usuario = await UsuarioService.getUsuarioId( idUsuario );
        await UsuarioMusica.destroy( {
            where: {
                idMusica: musica.id,
                idUsuario: usuario.id,
            },
        } );
    }

}

export const UsuarioMusicaService = new UsuarioMusicaServiceClass();