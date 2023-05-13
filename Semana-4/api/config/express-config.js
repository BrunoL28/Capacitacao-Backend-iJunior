const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usuarioRouter = require('../domains/usuarios/controllers/index');

app.use('/api/usuarios', usuarioRouter);

module.exports = app;