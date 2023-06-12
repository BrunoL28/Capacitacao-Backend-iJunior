import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

import { statusHTTP } from '../../../../utils/constants/statusHTTP';
import { UsuarioMusicaService } from '../services/UsuarioMusicaService';

router.get('/', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const usuariosmusicas = await UsuarioMusicaService.retorno();
        return response.status(statusHTTP.success).send(usuariosmusicas);
    } catch (error) {
        next(error);
    }
});

router.get('/usuarios/:id',  async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        const musicas = await UsuarioMusicaService.encontrar_musica(id);
        return response.status(statusHTTP.success).json(musicas);
    } catch (error) {
        next(error);
    }
});

router.get('/musicas/:id',  async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        const usuarios = await UsuarioMusicaService.encontrar_usuario(id);
        return response.status(statusHTTP.success).json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.post('/', async(request: Request, response: Response, next: NextFunction) => {
    try {
        await UsuarioMusicaService.criacao_usuario_musica(request.usuario!.id, request.params.id!);
        response.status(statusHTTP.created).json({ message: 'UsuarioMusica criado com sucesso' }).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        await UsuarioMusicaService.deletar(request.usuario!.id, request.params.id!);
        response.status(statusHTTP.no_content).end();
    } catch (error) {
        next(error);
    }
});