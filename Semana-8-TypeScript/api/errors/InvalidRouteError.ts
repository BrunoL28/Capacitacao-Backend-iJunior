/**
 * Classe filha de Error que define o acesso de uma 
 * rota inválida por parte do Usuário.
 */

export class InvalidRouteError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "InvalidRouteError";
    }
}