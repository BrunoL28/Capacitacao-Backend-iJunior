const router = require('express').Router();
const UsuarioService = require('../service/UsuarioService');
const statusHTTP = require('../../../constants/statusHTTP');

router.get('/', async(request, response) => {
    try {
        const usuarios = await UsuarioService.retorno();
        return response.status(statusHTTP.success).json(usuarios);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await UsuarioService.criacao(body);
        console.log('voltou do Service');
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const usuario_atualizado = await UsuarioService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(usuario_atualizado);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.mensage });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await UsuarioService.deletar(id);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.mensage });
    }
}); 

module.exports = router;