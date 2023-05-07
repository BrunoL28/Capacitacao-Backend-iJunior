const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');

router.get('/', (request, response) => {
    response.status(200).send(Musica);
});

module.exports = router;