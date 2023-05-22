const router = require('express').Router();
const ArtistaService = require('../service/ArtistaService');
const statusHTTP = require('../../../constants/statusHTTP');

router.get('/', async(request, response) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).json(artistas);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch {
        return response.status(statusHTTP.bad_request);
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const artista_atualizado = await ArtistaService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(artista_atualizado);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.mensage });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await ArtistaService.deletar(id);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.mensage });
    }
}); 

module.exports = router;