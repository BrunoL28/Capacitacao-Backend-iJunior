const router = require('express').Router();
const usuario = require('../models/usuario');

router.get('/', async(req, res) => {
    try {
        const usuarios = await usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (exception){
        return res.status(400).json({ error: exception.mensage });
    }
});

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        // eslint-disable-next-line no-unused-vars
        const Usuario = await usuario.create(body);
        return res.status(201).json(Usuario);
    } catch (exception){
        return res.status(400).json({ error: exception.mensage });
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const Usuario = await usuario.findByPk(id);
        if (!Usuario) {
            return res.status(401).json({ error: 'User not found!'});
        }
        const usuarioAtualizado = await usuario.update(req.body);
        return res.status(200).json(usuarioAtualizado);
    } catch (exception) {
        return res.status(401).json({ error: exception.mensage });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const Usuario = await usuario.findByPk(id);
        if (!Usuario) {
            return res.status(401).json({ error: 'User not found!'});
        }
        await usuario.destroy();
        return res.status(204).send();
    } catch (exception) {
        return res.status(401).json({ error: exception.mensage });
    }
});


module.exports = router;