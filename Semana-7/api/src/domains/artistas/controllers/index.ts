import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { cargo } from '../../../../utils/constants/cargo';
import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { checkRole, verifyJWT } from '../../../middlewares/auth-Middleware';
import { ArtistaService } from '../services/ArtistaService';


router.get('/', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistaService.retorno();
        return response.status(statusHTTP.success).send(artistas);
    } catch (error) {
        next(error);
    }
});

router.post('/', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    try {
        await ArtistaService.criacao(body);
        return response.status(statusHTTP.created).json({ 'message': 'artista criado com sucesso!' }).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyJWT, checkRole([cargo.ADMIN]), async(request: Request, response: Response, next: NextFunction) => {
    try {
        await ArtistaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json({ 'message': 'Artista atualizado com sucesso!'});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, checkRole([cargo.ADMIN]), async(request: Request, response: Response, next: NextFunction) => {
    try {
        await ArtistaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).json({'message': 'Artista deletado!'}).end();
    } catch (error) {
        next(error);
    }
});