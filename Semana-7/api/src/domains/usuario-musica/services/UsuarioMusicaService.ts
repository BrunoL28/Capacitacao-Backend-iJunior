import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import { Musica } from '../../musicas/models/Musica';
import { MusicaService } from '../../musicas/service/MusicaService';
import { Usuario } from '../../usuarios/models/Usuario';
import { UsuarioService } from '../../usuarios/services/UsuarioService';
import { UsuarioMusica } from '../models/UsuarioMusica';

class UsuarioMusicaServiceClass {
    
    /**
     * Função que retorna todas as músicas relacionadas à um usuário (vice-versa).
     * @returns UsuarioMusica
     */

    async retorno() {
        const usuarios_musicas = await UsuarioMusica.findAll();
        if (usuarios_musicas.length === 0) {
            throw new QueryError('Nenhum usuário favoritou essa música');
        }
        return usuarios_musicas;
    }

    /**
     * Cria um relacionamento que atrela uma música e um usuário.
     * @param {*} id_de_usuario 
     * @param {*} id_de_musica 
     */

    async criacao_usuario_musica(idUsuario: string, idMusica: string) {
        const usuario = await UsuarioService.encontrar(idUsuario);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuario encontrado com esse id');
        }
        const musica = await MusicaService.encontrar(idMusica);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma música foi encontrada com esse id');
        }
        await UsuarioMusica.create({
            idUsuario: usuario.id,
            idMusica: musica.id,
        });
    }

    /**
     * Encontra músicas através de usuários.
     * @param {*} id_de_usuario 
     * @returns Musica
     */

    async encontrar_musica(idUsuario: string) {
        const musicas = await Musica.findAll({
            include: {
                model: Usuario,
                where: { id: idUsuario },
                through: { attributes: [] },
            }
        });
        if (musicas.length === 0) {
            throw new QueryError('Nenhuma música encontrada através do artista');
        }
        return musicas;
    }

    /**
     * Encontra usuários através de músicas.
     * @param {*} id_de_musica 
     * @returns Usuario
     */

    async encontrar_usuario(idMusica: string) {
        const usuarios = await Usuario.findAll({
            include: {
                model: Musica,
                where: { id: idMusica },
                through: { attributes: [] },
            }
        });
        if (usuarios.length === 0) {
            throw new QueryError('Nenhum usuário foi encontrado através da música');
        }
        return usuarios;
    }

    /**
     * Deleta um relacionamento entre uma música e um usuário.
     * @param {*} id_de_usuario 
     * @param {*} id_de_musica 
     */

    async deletar(idUsuario: string, idMusica: string) {
        const usuario = await UsuarioService.encontrar(idUsuario);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário encontrado com esse id');
        }
        const musica = await MusicaService.encontrar(idMusica);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma música encontrada com esse id');
        }
        await UsuarioMusica.destroy({ where: { idUsuario: usuario.id, idMusica: musica.id } });
    }

}

export const UsuarioMusicaService = new UsuarioMusicaServiceClass();