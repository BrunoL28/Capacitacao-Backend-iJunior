const router = require('express').Router();
const MusicaService = require('../service/MusicaService');
const statusHTTP = require('../../../constants/statusHTTP');

router.get('/', async(request, response) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(statusHTTP.success).send(musicas);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.get('/:titulo', async(request, response) => {
    const { titulo } = request.params;
    try {
        const musica = await MusicaService.encontrar_por_titulo(titulo);
        return response.status(statusHTTP.success).json(musica);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});


router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'musica criada com sucesso' }).end();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const musica_atualizada = await MusicaService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(musica_atualizada);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await MusicaService.deletar_por_id(id);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

/* não sei se faz sentido, já que será um rota de admin
router.delete('/:titulo', async(request, response) => {
    const { titulo } = request.params;
    try {
        await MusicaService.deletar_por_titulo(titulo);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});
*/

module.exports = router;