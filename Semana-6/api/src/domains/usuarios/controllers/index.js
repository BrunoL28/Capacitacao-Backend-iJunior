const router = require('express').Router();
const UsuarioService = require('../service/UsuarioService');
const statusHTTP = require('../../../../constants/statusHTTP');
const Cargo = require('../../../../constants/cargos');
const {
    logginMiddleware,
    verifyJWT,
    notLoggedIn,
    checkRole } = require('../../../middlewares/authMiddleware');

router.post('/login', notLoggedIn, logginMiddleware);

router.post('/logout', verifyJWT, async(request, response, next) => {
    try {
        response.clearCookie('jwt');
        response.status(statusHTTP.no_content).end();
    } catch (error) {
        next(error);
    }
});

router.get('/', verifyJWT, checkRole([Cargo.ADMIN]), async(request, response, next) => {
    try {
        const usuarios = await UsuarioService.retorno();
        return response.status(statusHTTP.success).json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request, response, next) => {
    const body = request.body;
    try {
        await UsuarioService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyJWT, async(request, response, next) => {
    try {
        const usuario_atualizado = await UsuarioService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(usuario_atualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, async(request, response, next) => {
    try {
        await UsuarioService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
}); 

module.exports = router;