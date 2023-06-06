require('dotenv').config();
require('express-async-errors');

const cookieParser = require('cookie-parser');
const errorHandler = require('../src/middlewares/errorHandler');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser());

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuariosRouter = require('../src/domains/usuarios/controllers/index');
const musicasRouter = require('../src/domains/musicas/controllers/index');
const artistasRouter = require('../src/domains/artistas/controllers/index');
const usuariomusicaRouter = require('../src/domains/usuario-musica/controllers/index');

app.use('/api/usuarios', usuariosRouter);
app.use('/api/musicas', musicasRouter);
app.use('/api/artistas', artistasRouter);
app.use('/api/usuariomusica', usuariomusicaRouter);

app.use(errorHandler);

module.exports = app;