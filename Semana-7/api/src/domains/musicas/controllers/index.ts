import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { cargo } from '../../../../utils/constants/cargo';
import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { checkRole, verifyJWT } from '../../../middlewares/auth-Middleware';
import { MusicaService } from '../service/MusicaService';


router.get('/', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        const musicas = await MusicaService.retorno();
        return response.status(statusHTTP.success).send(musicas);
    } catch (error) {
        next(error);
    }
});

router.post('/', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    try {
        await MusicaService.criacao(body);
        return response.status(statusHTTP.created).json({ 'message': 'Música criada com sucesso!'}).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        await MusicaService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json({'message': 'Música atualizada com sucesso!'});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, checkRole([cargo.ADMIN]), async(request: Request, response: Response, next: NextFunction) => {
    try {
        await MusicaService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).json({'message': 'Música deletada!'}).end();
    } catch (error) {
        next(error);
    }
});