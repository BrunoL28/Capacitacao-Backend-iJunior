const router = require('express').Router();
const MusicaService = require('../service/MusicaService');
const statusHTTP = require('../../../../constants/statusHTTP');
const Cargo = require('../../../../constants/cargos');
const checkRole = require('../../../middlewares/checkRole');

router.get('/', async(request, response, next) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(statusHTTP.success).send(musicas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request, response, next) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'musica criada com sucesso' }).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', checkRole([Cargo.ADMIN]), async(request, response, next) => {
    try {
        const musica_atualizada = await MusicaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(musica_atualizada);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', checkRole([Cargo.ADMIN]), async(request, response, next) => {
    try {
        await MusicaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;