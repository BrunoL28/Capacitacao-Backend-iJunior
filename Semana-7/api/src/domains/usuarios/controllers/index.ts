import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { UsuarioService } from '../services/UsuarioService';


router.get('/', async(request: Request, response: Response, next: NextFunction) => {
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

router.put('/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.atualizar(request.params.id, request.body);
        return response.status(statusHTTP.success).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        await UsuarioService.deletar(request.params.id);
        return response.status(statusHTTP.no_content).send();
    } catch (error) {
        next(error);
    }
});