const router = require('express').Router();
const MusicaService = require('../service/MusicaService');
const statusHTTP = require('../../../constants/statusHTTP');

router.get('/', async(request, response) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(statusHTTP.success).json(musicas);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'musica criada com sucesso' }).end();
    } catch {
        return response.status(statusHTTP.bad_request);
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const musica_atualizada = await MusicaService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(musica_atualizada);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await MusicaService.deletar(id);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

module.exports = router;