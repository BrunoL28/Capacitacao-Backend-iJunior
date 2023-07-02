"use strict";
/**
 * Classe filha de Error que define quando o Usuário
 * tenta executar uma ação não permitida.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionError";
    }
}
exports.PermissionError = PermissionError;
