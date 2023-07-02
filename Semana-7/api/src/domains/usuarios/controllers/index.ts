import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { loginMiddleware, notLoggedIn, verifyJWT } from '../../../middlewares/auth-Middleware';
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

router.get('/', /*verifyJWT,*/ async(request: Request, response: Response, next: NextFunction) => {
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
        return response.status(statusHTTP.created).json({ 'message': 'Usuário criado com sucesso!'}).end();
    } catch (error) {
        next(error);
    }
});

router.put('/:id', /*verifyJWT,*/ async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await UsuarioService.atualizar(id!, request.body, request.usuario!);
        return response.status(statusHTTP.success).json({'message': 'Usuário Atualizado com sucesso!'}).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', /*verifyJWT, checkRole([cargo.ADMIN]), */ async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await UsuarioService.deletar(id, request.usuario!.id);
        return response.status(statusHTTP.no_content).json({'message': 'Usuário deletado!'}).end();
    } catch (error) {
        next(error);
    }
});