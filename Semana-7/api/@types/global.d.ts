interface PayloadParams {
    id: string;
    nome: string;
    email: string;
    cargo: string;
}

interface Env {
    DB: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    SECRET_KEY: string;
    NODE_ENV: string;
    JWT_EXPIRATION: string;
    CLIENT_URL: string;
}

declare global {
    namespace Express {
        interface Request {
            usuario?: PayloadParams;
        }
    }
}

namespace NodeJS {
    interface ProcessEnv {
        DB: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        SECRET_KEY: string;
        NODE_ENV: string;
        JWT_EXPIRATION: string;
        CLIENT_URL: string;
    }
}

