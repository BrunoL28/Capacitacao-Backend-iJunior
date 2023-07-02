/**
 * Classe filha de Error que define quando o Usuário
 * tenta executar uma ação não permitida.
 */

export class PermissionError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "PermissionError";
    }
}