const router = require('express').Router();
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await UsuarioService.criacao(body);
        return response.status(201).json({ message: 'usuario criado com sucesso'});
    } catch {
        return response.status(400);
    }
});

module.exports = router;