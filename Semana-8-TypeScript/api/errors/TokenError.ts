/**
 * Classe filha de Error que define um Token
 * de requisição inválido.
 */

export class TokenError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "TokenError";
    }
}