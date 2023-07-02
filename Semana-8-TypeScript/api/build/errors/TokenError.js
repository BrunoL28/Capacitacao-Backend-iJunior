"use strict";
/**
 * Classe filha de Error que define um Token
 * de requisição inválido.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = void 0;
class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenError";
    }
}
exports.TokenError = TokenError;
