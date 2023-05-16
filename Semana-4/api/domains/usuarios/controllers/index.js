const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');

router.get('/', async(request, response) => {
    try {
        const usuarios = await UsuarioService.retorno();
        return response.status(200).json(usuarios);
    } catch (exception) {
        return response.status(400).json({ error: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await UsuarioService.criacao(body);
        return response.status(201).json({ message: 'usuario criado com sucesso' });
    } catch {
        return response.status(400);
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const usuario_atualizado = await UsuarioService.atualizar(id, request.body);
        return response.status(200).json(usuario_atualizado);
    } catch (exception) {
        return response.status(400).json({ erro: exception.mensage });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await UsuarioService.deletar(id);
        return response.status(204).send();
    } catch (exception) {
        return response.status(400).json({ erro: exception.mensage });
    }
}); 

module.exports = router;