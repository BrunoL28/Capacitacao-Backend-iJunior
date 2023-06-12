import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { getEnv } from '../utils/functions/get-env';

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    origin: getEnv('CLIENT_URL'),
    credentials: true,
};

app.use(cors(options));

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

import { router as artistasRouter } from '../src/domains/artistas/controllers/index';
import { router as musicasRouter } from '../src/domains/musicas/controllers/index';
import { router as usuariomusicaRouter } from '../src/domains/usuario-musica/controllers/index';
import { router as usuariosRouter } from '../src/domains/usuarios/controllers/index';
app.use('/api/artistas', artistasRouter);
app.use('/api/musicas', musicasRouter);
app.use('/api/usuariomusica', usuariomusicaRouter);
app.use('/api/usuario', usuariosRouter);

import { errorHandler } from '../src/middlewares/errorHandler';

app.use(errorHandler);


