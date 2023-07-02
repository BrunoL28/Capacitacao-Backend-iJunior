import { NextFunction, Request, Response, Router } from "express";
import { statusHTTP } from "../../../../utils/constants/statusHTTP";
import { verifyJWT } from "../../../middlewares/auth-middleware";
import { MusicaService } from "../../Musicas/services/MusicaService";
import { UsuarioMusicaService } from "../services/UsuarioMusicaService";

export const router = Router();

router.get( "/usuarios-musicas", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const usuariosMusicas = await UsuarioMusicaService.getUsuariosMusicas();
            response.status( statusHTTP.success ).send( usuariosMusicas );
        } catch ( error ) {
            next( error );
        }
    } );

router.get( "/usuarios/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const musicas = await UsuarioMusicaService.getMusicaComUsuario( request.params.id );
            response.status( statusHTTP.success ).send( musicas );
        } catch ( error ) {
            next( error );
        }
    } );

router.get( "/musicas/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const usuarios = await UsuarioMusicaService.getUsuarioComMusica( request.params.id );
            response.status( statusHTTP.success ).send( usuarios );
        } catch ( error ) {
            next( error );
        }
    } );

router.post( "/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await UsuarioMusicaService.postUsuarioMusica( request.user!.id, request.params.id );
            response.status( statusHTTP.created ).json( { "message": "Relacionamento de Usuário e Música criado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.delete( "/musicas/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await MusicaService.deleteMusica( request.params.id );
            response.status( statusHTTP.no_content ).json( { "message": "Relacionamento de Usuário e Música deletado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );