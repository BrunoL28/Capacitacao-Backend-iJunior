const router = require('express').Router();
const ArtistaService = require('../service/ArtistaService');
const statusHTTP = require('../../../constants/statusHTTP');

router.get('/', async(request, response) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).send(artistas);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.get('/:nome', async(request, response) => {
    const { nome } = request.params;
    try {
        const artista = await ArtistaService.encontrar_por_nome(nome);
        response.status(statusHTTP.success).send(artista);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    } 
});

router.get('/:nome/musicas', async(request, response) => {
    const { nome } = request.params;
    try {
        const musica = await ArtistaService.encontrar_musica(nome);
        response.status(statusHTTP.success).send(musica);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.post('/', async(request, response) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ message: 'usuario criado com sucesso' }).end();
    } catch (exception){
        return response.status(statusHTTP.bad_request).json({ error: exception.message });
    }
});

router.put('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        const artista_atualizado = await ArtistaService.atualizar(id, request.body);
        return response.status(statusHTTP.success).json(artista_atualizado);
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});

router.delete('/:id', async(request, response) => {
    const { id } = request.params;
    try {
        await ArtistaService.deletar_por_id(id);
        return response.status(statusHTTP.no_content).send();
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
}); 

/*não sei se faz sentido, já que será uma rota de admin
router.delete('/:nome', async(request, response) => {
    const { nome } = request.params;
    try {
        await ArtistaService.deletar_por_nome(nome);
        return response.status(statusHTTP.no_content).send(); 
    } catch (exception) {
        return response.status(statusHTTP.bad_request).json({ erro: exception.message });
    }
});
*/

module.exports = router;