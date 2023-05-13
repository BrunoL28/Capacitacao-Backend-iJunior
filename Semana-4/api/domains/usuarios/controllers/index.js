const router = require('express').Router();
const usuario = require('../models/usuario');

router.post('/', async(req, res) => {
    const body = req.body;
    try{
        // eslint-disable-next-line no-unused-vars
        const Usuario = await usuario.create(body);
        return res.status(201);
    }catch{
        return res.status(400);
    }
});

module.exports = router;