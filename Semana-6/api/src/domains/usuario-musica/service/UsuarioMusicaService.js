const UsuarioMusica = require('../models/UsuarioMusica');
const Musica = require('../../musicas/models/Musica');
const Usuario = require('../../usuarios/models/Usuario');
const MusicaService = require('../../musicas/service/MusicaService');
const UsuarioService = require('../../usuarios/service/UsuarioService');
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');

class UsuarioMusicaService {
    
    /**
     * Função que retorna todas as músicas relacionadas à um usuário (vice-versa).
     * @returns UsuarioMusica
     */

    async retorno() {
        const usuarios_musicas = await UsuarioMusica.findAll();
        if (usuarios_musicas.lenght === 0) {
            throw new QueryError('Nenhum usuário favoritou essa música');
        }
        return usuarios_musicas;
    }

    /**
     * Cria um relacionamento que atrela uma música e um usuário.
     * @param {*} id_de_usuario 
     * @param {*} id_de_musica 
     */

    async criacao_usuario_musica(id_de_usuario, id_de_musica) {
        const usuario = await UsuarioService.encontrar(id_de_usuario);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuario encontrado com esse id');
        }
        const musica = await MusicaService.encontrar(id_de_musica);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma música foi encontrada com esse id');
        }
        await UsuarioMusica.create({ id_de_usuario: usuario.id, id_de_musica: musica.id });
    }

    /**
     * Encontra músicas através de usuários.
     * @param {*} id_de_usuario 
     * @returns Musica
     */

    async encontrar_musica(id_de_usuario) {
        const musicas = await Musica.findAll({
            include: {
                model: Usuario,
                where: { id: id_de_usuario },
                through: { attributes: [] },
            }
        });
        if (musicas.lenght === 0) {
            throw new QueryError('Nenhuma música encontrada através do artista');
        }
        return musicas;
    }

    /**
     * Encontra usuários através de músicas.
     * @param {*} id_de_musica 
     * @returns Usuario
     */

    async encontrar_usuario(id_de_musica) {
        const usuarios = await Usuario.findAll({
            include: {
                model: Musica,
                where: { id: id_de_musica },
                through: { attributes: [] },
            }
        });
        if (usuarios.lenght === 0) {
            throw new QueryError('Nenhum usuário foi encontrado através da música');
        }
        return usuarios;
    }

    /**
     * Deleta um relacionamento entre uma música e um usuário.
     * @param {*} id_de_usuario 
     * @param {*} id_de_musica 
     */

    async deletar(id_de_usuario, id_de_musica) {
        const usuario = await UsuarioService.encontrar(id_de_usuario);
        if (usuario === null) {
            throw new InvalidParamError('Nenhum usuário encontrado com esse id');
        }
        const musica = await MusicaService.encontrar(id_de_musica);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma música encontrada com esse id');
        }
        await UsuarioMusica.destroy({ where: { id_de_usuario: usuario.id, id_de_musica: musica.id } });
    }

}

module.exports = UsuarioMusicaService;