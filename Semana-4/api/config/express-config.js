const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuariosRouter = require('../domains/usuarios/controllers/index');

app.use('/api/usuarios', usuariosRouter);

module.exports = app;