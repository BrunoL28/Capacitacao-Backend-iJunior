"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
function getEnv(nome) {
    const value = process.env[nome];
    if (!value) {
        throw new Error(`Está faltando: process.env['${nome}'].`);
    }
    return value;
}
exports.getEnv = getEnv;
