"use strict";
/**
 * Classe filha de Error que define que o
 * Usuário realizou uma consulta inválida.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryError = void 0;
class QueryError extends Error {
    constructor(message) {
        super(message);
        this.name = "QueryError";
    }
}
exports.QueryError = QueryError;
