const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuariosRouter = require('../domains/usuarios/controllers/index');

app.use('/api/usuarios', usuariosRouter);

const artistasRouter = require('../domains/artistas/controllers/index');

app.use('/api/artistas', artistasRouter);

const musicasRouter = require('../domains/musicas/controllers/index');

app.use('/api/musicas', musicasRouter);

const usuariomusicaRouter = require('../domains/usuario-musica/controllers/index');

app.use('/api/usuariomusica', usuariomusicaRouter);

module.exports = app;