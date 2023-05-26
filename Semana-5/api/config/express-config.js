const express = require('express');
require('dotenv').config();

require('express-async-errors');

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuariosRouter = require('../src/domains/usuarios/controllers/index');

app.use('/api/usuarios', usuariosRouter);

const artistasRouter = require('../src/domains/artistas/controllers/index');

app.use('/api/artistas', artistasRouter);

const musicasRouter = require('../src/domains/musicas/controllers/index');

app.use('/api/musicas', musicasRouter);

const usuariomusicaRouter = require('../src/domains/usuario-musica/controllers/index');

app.use('/api/usuariomusica', usuariomusicaRouter);

const errorHandler = require('../src/middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;