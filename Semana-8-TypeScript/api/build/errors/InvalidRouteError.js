"use strict";
/**
 * Classe filha de Error que define o acesso de uma
 * rota inválida por parte do Usuário.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRouteError = void 0;
class InvalidRouteError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidRouteError";
    }
}
exports.InvalidRouteError = InvalidRouteError;
