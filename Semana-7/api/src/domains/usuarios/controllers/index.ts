import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { cargo } from '../../../../utils/constants/cargo';
import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { checkRole, loginMiddleware, notLoggedIn, verifyJWT } from '../../../middlewares/auth-Middleware';
import { UsuarioService } from '../services/UsuarioService';

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        response.clearCookie('jwt');
        response.status(statusHTTP.no_content).end();
    } catch (error) {
        next(error);
    }
});

router.get('/', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioService.retorno();
        return response.status(statusHTTP.success).send(usuarios);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    try {
        await UsuarioService.criacao(body);
        return response.status(statusHTTP.created).json({ 'message': 'usuário criada com sucesso!'}).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyJWT, async(request: Request, response: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.atualizar(request.params.id!, request.body, request.usuario!);
        return response.status(statusHTTP.success).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyJWT, checkRole([cargo.ADMIN]), async(request: Request, response: Response, next: NextFunction) => {
    try {
        await UsuarioService.deletar(request.params.id!, request.usuario!.id);
        return response.status(statusHTTP.no_content).end();
    } catch (error) {
        next(error);
    }
});