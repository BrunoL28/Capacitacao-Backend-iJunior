const router = require('express').Router();
const ArtistaService = require('../service/ArtistaService');
const statusHTTP = require('../../../../constants/statusHTTP');
const Cargo = require('../../../../constants/cargos');
const {
    verifyJWT,
    checkRole } = require('../../../middlewares/authMiddleware');

router.get('/', verifyJWT, async(request, response, next) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).send(artistas);
    } catch (error) {
        next(error);
    }
});

router.post('/', verifyJWT, async(request, response, next) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (error){
        next(error);
    }
});

router.put('/:id', verifyJWT, checkRole([Cargo.ADMIN]),async(request, response, next) => {
    try {
        const artista_atualizado = await ArtistaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(artista_atualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, checkRole([Cargo.ADMIN]),async(request, response, next) => {
    try {
        await ArtistaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});   

module.exports = router;