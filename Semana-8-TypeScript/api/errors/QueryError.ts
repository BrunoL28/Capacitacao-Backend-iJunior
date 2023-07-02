/**
 * Classe filha de Error que define que o 
 * Usuário realizou uma consulta inválida.
 */

export class QueryError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "QueryError";
    }
}