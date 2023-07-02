"use strict";
/**
 * Classe filha de Error que define situações em que
 * o Usuário tenta realizar uma ação não autorizada.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
class NotAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAuthorizedError";
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
