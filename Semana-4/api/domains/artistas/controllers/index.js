const router = require('express').Router();
const artista = require('../models/artista');

router.get('/', async(req, res) => {
    try {
        const artistas = await artista.findAll();
        return res.status(200).json(artistas);
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const Artista = await artista.create(body);
        return res.status(201).json(Artista);
    } catch (exception) {
        return res.status(400).json({ error: exception.message });
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const Artista = await artista.findByPk(id);
        if (!Artista) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        const artistaAtualizado = await artista.update(req.body);
        return res.status(200).json(artistaAtualizado);
    } catch (exception) {
        return res.status(400).json({ error: exception.mensage });
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const Artista = await artista.findByPk(id);
        if (!Artista) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        await Artista.destroy();
        return res.status(200).send();
    } catch (exception) {
        return res.send(400).json({ error: exception.mensage });
    }
});

module.exports = router;