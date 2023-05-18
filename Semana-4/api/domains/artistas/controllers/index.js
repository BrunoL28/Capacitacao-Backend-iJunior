const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const Artista = require('../models/Artista');
const ArtistaService = require('../service/ArtistaService');

router.get('/', async(request, response) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(200).json(artistas);
    } catch (exception) {
        return response.status(400).json({ error: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(201).json({ message: 'usuario criado com sucesso' }).end();
    } catch {
        return response.status(400);
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const artista_atualizado = await ArtistaService.atualizar(id, request.body);
        return response.status(200).json(artista_atualizado);
    } catch (exception) {
        return response.status(400).json({ erro: exception.mensage });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await ArtistaService.deletar(id);
        return response.status(204).send();
    } catch (exception) {
        return response.status(400).json({ erro: exception.mensage });
    }
}); 

module.exports = router;