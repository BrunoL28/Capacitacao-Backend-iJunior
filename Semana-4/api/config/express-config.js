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

module.exports = app;