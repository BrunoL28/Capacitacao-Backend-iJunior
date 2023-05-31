const router = require('express').Router();
const ArtistaService = require('../service/ArtistaService');
const statusHTTP = require('../../../../constants/statusHTTP');

router.get('/', async(request, response, next) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).send(artistas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request, response, next) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (error){
        next(error);
    }
});

router.put('/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        const artista_atualizado = await ArtistaService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(artista_atualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        await ArtistaService.deletar(id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});   

module.exports = router;