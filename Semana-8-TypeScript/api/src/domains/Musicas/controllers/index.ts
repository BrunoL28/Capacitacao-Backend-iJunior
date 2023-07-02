import { NextFunction, Request, Response, Router } from "express";
import { cargos } from "../../../../utils/constants/cargos";
import { statusHTTP } from "../../../../utils/constants/statusHTTP";
import { checkRole, verifyJWT } from "../../../middlewares/auth-middleware";
import { MusicaService } from "../services/MusicaService";

export const router = Router();

router.get( "/list", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const musicas = await MusicaService.getMusicas();
            response.status( statusHTTP.success ).send( musicas );
        } catch ( error ) {
            next( error );
        }
    } );

router.get( "/list/:nome", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const musica = await MusicaService.getMusicaTitulo( request.params.titulo );
            response.status( statusHTTP.success ).send( musica );
        } catch ( error ) {
            next( error );
        }
    } );

router.post( "/add", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await MusicaService.postMusica( request.body );
            response.status( statusHTTP.created ).json( { "message": "Música criada com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.put( "/:id", 
    verifyJWT, checkRole( [ cargos.admin ] ), 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await MusicaService.putMusica( request.params.id, request.body );
            response.status( statusHTTP.success ).json( { "message": "Música atualizada com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.delete( "/delete/:id", 
    verifyJWT, checkRole( [ cargos.admin ] ), 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await MusicaService.deleteMusica( request.params.id );
            response.status( statusHTTP.no_content ).json( { "message": "Música deletada com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );