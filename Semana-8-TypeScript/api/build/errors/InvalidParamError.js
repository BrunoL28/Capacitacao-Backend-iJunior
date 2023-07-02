"use strict";
/**
 * Classe filha de Error que define que um parâmetro passado
 * pelo Usuário não atende os padrões para requisição.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidParamError";
    }
}
exports.InvalidParamError = InvalidParamError;
