const router = require('express').Router;
const musica = require('../models/musica');

router.get('/', async(req, res) => {
    try {
        const musicas = await musica.findAll();
        return res.status(200).json(musicas);
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const Musica = await musica.create(body);
        return res.status(201).json(Musica);
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const Musica = await musica.findByPk(id);
        if (!Musica) {
            return res.status(404).json({ error: 'Music not found' });
        }
        const musicaAtualizada = await musica.update(req.body);
        return res.status(200).json(musicaAtualizada);
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const Musica = await musica.findByPk(id);
        if (!Musica) {
            return res.status(404).json({ error: 'Music not found' });
        }
        await Musica.destroy();
        return res.status(200).send();
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

module.exports = router;