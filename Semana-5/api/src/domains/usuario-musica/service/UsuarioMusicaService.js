const UsuarioMusica = require('../models/UsuarioMusica');
const Musica = require('../../musicas/models/Musica');
const Usuario = require('../../usuarios/models/Usuario');
const MusicaService = require('../../musicas/service/MusicaService');
const UsuarioService = require('../../usuarios/service/UsuarioService');

class UsuarioMusicaService {
    
    async retorno() {
        return await UsuarioMusica.findAll();
    }

    async criacao_usuario_musica(id_de_usuario, id_de_musica) {
        try {
            const usuario = await UsuarioService.encontrar(id_de_usuario);
            const musica = await MusicaService.encontrar_por_id(id_de_musica);
            await UsuarioMusica.create({ id_de_usuario: usuario.id, id_de_musica: musica.id });
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

    async encontrar_musica(id_de_usuario) {
        const musicas = await Musica.findAll({
            include: {
                model: Usuario,
                where: { id: id_de_usuario },
                through: { attributes: [] },
            }
        });
        return musicas;
    }

    async encontrar_usuario(id_de_musica) {
        const usuarios = await Usuario.findAll({
            include: {
                model: Musica,
                where: { id: id_de_musica },
                through: { attributes: [] },
            }
        });
        return usuarios;
    }

    async deletar(id_de_usuario, id_de_musica) {
        try {
            const usuario = await UsuarioService.encontrar(id_de_usuario);
            const musica = await MusicaService.encontrar_por_id(id_de_musica);
            await UsuarioMusica.destroy({ where: { id_de_usuario: usuario.id, id_de_musica: musica.id } });
        } catch (erro) {
            throw new Error(erro.message);
        }
    }

}

module.exports = UsuarioMusicaService;