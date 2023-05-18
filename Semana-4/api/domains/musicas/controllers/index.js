const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const Musica = require('../models/Musica');
const MusicaService = require('../service/MusicaService');

router.get('/', async(request, response) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(200).json(musicas);
    } catch (exception) {
        return response.status(400).json({ erro: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(201).json({ message: 'musica criada com sucesso' }).end();
    } catch {
        return response.status(400);
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const musica_atualizada = await MusicaService.atualizar(id, request.body);
        return response.status(200).json(musica_atualizada);
    } catch (exception) {
        return response.status(400).json({ erro: exception.message });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await MusicaService.deletar(id);
        return response.status(204).send();
    } catch (exception) {
        return response.status(400).json({ erro: exception.message });
    }
});

module.exports = router;