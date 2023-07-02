"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const get_env_1 = require("../utils/functions/get-env");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const options = {
    origin: (0, get_env_1.getEnv)("CLIENT_URL"),
    credentials: true,
};
exports.app.use((0, cors_1.default)(options));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.urlencoded({
    extended: true,
}));
exports.app.use(express_1.default.json());
const index_1 = require("../src/domains/Artistas/controllers/index");
const index_2 = require("../src/domains/Musicas/controllers/index");
const index_3 = require("../src/domains/UsuarioMusica/controllers/index");
const index_4 = require("../src/domains/Usuarios/controllers/index");
exports.app.use("/api/artistas", index_1.router);
exports.app.use("/api/musicas", index_2.router);
exports.app.use("/api/usuarios", index_4.router);
exports.app.use("/api/usuario-musica", index_3.router);
const error_handler_1 = require("../src/middlewares/error-handler");
exports.app.use(error_handler_1.errorHandler);
