/**
 * Classe filha de Error que define que um parâmetro passado
 * pelo Usuário não atende os padrões para requisição.
 */

export class InvalidParamError extends Error {
    constructor( message: string ) {
        super( message );
        this.name = "InvalidParamError";
    }
}