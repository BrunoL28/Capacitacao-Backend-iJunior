/**
 * Classe filha de Error que define situações em que
 * o Usuário tenta realizar uma ação não autorizada.
 */

export class NotAuthorizedError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "NotAuthorizedError";
    }
}