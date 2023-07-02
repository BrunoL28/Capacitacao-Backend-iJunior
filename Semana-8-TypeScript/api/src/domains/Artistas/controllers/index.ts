import { NextFunction, Request, Response, Router } from "express";
import { cargos } from "../../../../utils/constants/cargos";
import { statusHTTP } from "../../../../utils/constants/statusHTTP";
import { checkRole, verifyJWT } from "../../../middlewares/auth-middleware";
import { ArtistaService } from "../services/ArtistaService";

export const router = Router();


router.get( "/list", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const artistas = await ArtistaService.getArtistas();
            response.status( statusHTTP.success ).send( artistas );
        } catch ( error ) {
            next( error );
        }
    } );

router.get( "/list/:nome",
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const artista = await ArtistaService.getArtistaNome( request.params.nome );
            response.status( statusHTTP.success ).send( artista );
        } catch ( error ) {
            next( error );
        }
    } );

router.post( "/add", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await ArtistaService.postArtista( request.body );
            return response.status( statusHTTP.created ).json( { "message": "Artista criado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.put( "/:id", 
    verifyJWT, checkRole( [ cargos.admin ] ), 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await ArtistaService.putArtista( request.params.id, request.body );
            response.status( statusHTTP.success ).json( { "message": "Artista atualizado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.delete( "/delete/:id", 
    verifyJWT, checkRole( [ cargos.admin ] ), 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await ArtistaService.deleteArtista( request.params.id );
            response.status( statusHTTP.no_content ).json( { "message": "Artista deletado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );