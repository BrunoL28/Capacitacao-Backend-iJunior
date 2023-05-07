const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extendend: true,
}));

const musicaRouter = require('../src/domains/musicas/controllers/index');
app.use('/api/musica', musicaRouter);

module.exports = app;