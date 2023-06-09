import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import artistasRouter from '../src/domains/artistas/controllers/index';
import musicasRouter from '../src/domains/musicas/controllers/index';
import usuariomusicaRouter from '../src/domains/usuario-musica/controllers/index';
import usuariosRouter from '../src/domains/usuarios/controllers/index';

import errorHandler from '../src/middlewares/errorHandler';

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

app.use(cors(options));

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/musicas', musicasRouter);
app.use('/api/artistas', artistasRouter);
app.use('/api/usuariomusica', usuariomusicaRouter);

app.use(errorHandler);

export default app;


