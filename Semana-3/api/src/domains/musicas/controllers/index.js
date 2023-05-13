const express = require('express');
const router = express.Router();
const listaDeMusicas = require('../models/musica');

router.get('/', (request, response) => {
    response.status(200).json(listaDeMusicas);
});

router.post('/', (request, response) => {
    const { nome, artista, genero, quantidadeDownloads } = request.body;

    if (!nome) {
        response.status(400).json({ mensagem: 'O campo "nome" é necessário' });
        return;
    }

    const newMusic = { nome, artista, genero, quantidadeDownloads };
    listaDeMusicas.push(newMusic);

    response.status(201).json(newMusic);
});

router.put('/:nome', (request, response) => {
    const { nome } = request.params;

    const music = listaDeMusicas.find(msc => msc.nome === nome);

    if (!music) {
        response.status(404).json({ mensagem: 'Música não encontrada' });
        return;
    }

    const { artista, genero, quantidadeDownloads } = request.body;

    music.artista = artista || music.artista;
    music.genero = genero || music.genero;
    music.quantidadeDownloads = quantidadeDownloads || music.quantidadeDownloads;

    response.json(music);
});

router.delete('/:nome', (request, response) => {
    const { nome } = request.params;

    const musicIndex = listaDeMusicas.findIndex(msc => msc.nome === nome);

    if (musicIndex === -1) {
        response.status(404).json({ mensagem: 'Música não encontrada' });
        return;
    }

    listaDeMusicas.splice(musicIndex, 1);

    response.status(204).send();
});

module.exports = router;