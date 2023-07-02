import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { getEnv } from "../utils/functions/get-env";

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    origin: getEnv( "CLIENT_URL" ),
    credentials: true,
};

app.use( cors( options ) );

app.use( cookieParser() );

app.use( express.urlencoded( {
    extended: true,
} ) );

app.use( express.json() );

import { router as artistaRouter } from "../src/domains/Artistas/controllers/index";
import { router as musicaRouter } from "../src/domains/Musicas/controllers/index";
import { router as usuarioMusicaRouter } from "../src/domains/UsuarioMusica/controllers/index";
import { router as usuarioRouter } from "../src/domains/Usuarios/controllers/index";

app.use( "/api/artistas", artistaRouter );
app.use( "/api/musicas", musicaRouter );
app.use( "/api/usuarios", usuarioRouter );
app.use( "/api/usuario-musica", usuarioMusicaRouter );

import { errorHandler } from "../src/middlewares/error-handler";

app.use( errorHandler );