import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { ArtistaService } from '../services/ArtistaService';


router.get('/', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).send(artistas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ 'message': 'usuário criado com sucesso!' }).end();
    } catch (error) {
        next(error);
    }
});

router.put('/id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const artistaAtualizado = await ArtistaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(artistaAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        await ArtistaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});