const router = require('express').Router();
const UsuarioMusicaService = require('../service/UsuarioMusicaService');
const statusHTTP = require('../../../../constants/statusHTTP');
const MusicaService = require('../../musicas/service/MusicaService');

router.get('/', async(request, response, next) => {
    try {
        const usuariosmusicas = await UsuarioMusicaService.retorno();
        return response.status(statusHTTP.success).send(usuariosmusicas);
    } catch (error) {
        next(error);
    }
});

router.get('/usuarios/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        const musicas = await UsuarioMusicaService.encontrar_musica(id);
        return response.status(statusHTTP.success).json(musicas);
    } catch (error) {
        next(error);
    }
});

router.get('/musicas/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        const usuarios = await UsuarioMusicaService.encontrar_usuario(id);
        return response.status(statusHTTP.success).json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request, response, next) => {
    const { id } = request.params;
    const { id_usuario } = request.usuario.id;
    try {
        await UsuarioMusicaService.criacao_usuario_musica(id_usuario, id);
        response.status(statusHTTP.created).json({ message: 'UsuarioMusica criado com sucesso' }).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/musicas/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        await MusicaService.deletar_por_id(id);
        response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;