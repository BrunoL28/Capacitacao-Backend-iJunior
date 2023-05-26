const router = require('express').Router();
const UsuarioService = require('../service/UsuarioService');
const statusHTTP = require('../../../../constants/statusHTTP');

router.get('/', async(request, response, next) => {
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
        console.log('voltou do Service');
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        const usuario_atualizado = await UsuarioService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(usuario_atualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(request, response, next) => {
    const { id } = request.params;
    try {
        await UsuarioService.deletar(id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
}); 

module.exports = router;