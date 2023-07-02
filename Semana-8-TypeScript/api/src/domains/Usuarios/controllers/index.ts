import { NextFunction, Request, Response, Router } from "express";
import { cargos } from "../../../../utils/constants/cargos";
import { statusHTTP } from "../../../../utils/constants/statusHTTP";
import { checkRole, loginMiddleware, notLoggedIn, verifyJWT } from "../../../middlewares/auth-middleware";
import { UsuarioService } from "../services/UsuarioService";

export const router = Router();

// ------------------ Rotas de Login e Logout ----------------------------------------//

router.post( "/login", notLoggedIn, loginMiddleware );

router.post( "/logout", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            response.clearCookie( "jwt" );
            response.status( statusHTTP.no_content ).end();
        } catch ( error ) {
            next( error );
        }
    } );

// -----------------------------------------------------------------------------------//

router.get( "/list", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const usuarios = await UsuarioService.getUsuarios();
            response.status( statusHTTP.success ).send( usuarios );
        } catch ( error ) {
            next( error );
        }
    } );

router.get( "/list/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            const usuario = await UsuarioService.getUsuarioId( request.params.id );
            response.status( statusHTTP.success ).send( usuario );
        } catch ( error ) {
            next( error );
        }
    } );

router.post( "/add", 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            await UsuarioService.postUsuario( request.body );
            response.status( statusHTTP.created ).json( { "message": "Usuário criado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.put( "/:id", 
    verifyJWT, 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await UsuarioService.putUsuario( request.params.id!, request.body, request.user! );
            response.status( statusHTTP.success ).json( { "message": "Usuário atualizado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );

router.delete( "/delete/:id", 
    verifyJWT, checkRole( [ cargos.admin ] ), 
    async( request: Request, response: Response, next: NextFunction ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await UsuarioService.deleteUsuario( request.params.id!, request.user!.id );
            response.status( statusHTTP.no_content ).json( { "message": "Usuário deletado com sucesso!" } ).end();
        } catch ( error ) {
            next( error );
        }
    } );