import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { MusicaService } from '../service/MusicaService';


router.get('/', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(statusHTTP.success).send(musicas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(statusHTTP.created).json({ 'message': 'música criada com sucesso!'}).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const musicaAtualizada = await MusicaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(musicaAtualizada);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        await MusicaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});