const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');
const listaDeMusicas = require('../models/musica');

router.get('/', (request, response) => {
    
    const { body } = request;

    if (body.nome === undefined) {
        response.status(400).json({ mensagem: 'O campo "nome" é necessário'});
    } else if (body.nome === '') {
        response.status(400).json({ message: 'O campo "nome" não pode estar vazio'});
    } else {
        response.status(200).send(Musica);
    }
});

router.post('/', (request, response) => {

    const { nome, artista, genero, quantidadeDownloads } = request.body;

    const newMusic = {
        nome: nome,
        artista: artista,
        genero: genero,
        quantidadeDownloads: quantidadeDownloads,
    };

    listaDeMusicas.push( newMusic );

    response.json( newMusic );

});

router.put('/:nome', (request, response) => {

    const { nome } = request.params;

    const music = listaDeMusicas.find( msc => msc.nome == nome);

    if( !music ) {
        return response.status(204).json();
    }

    const { artista, genero, quantidadeDownloads } = request.body;

    music.artista = artista;
    music.genero = genero;
    music.quantidadeDownloads = quantidadeDownloads;

    response.json(music);

});



module.exports = router;