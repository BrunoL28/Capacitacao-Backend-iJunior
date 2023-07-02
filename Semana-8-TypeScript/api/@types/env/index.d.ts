declare namespace NodeJS {
    interface ProcessEnv {
        CLIENT_URL: string | undefined,
        PORT: string | undefined,
        SECRET_KEY: string | undefined,
        JWT_EXPIRATION: string | undefined,
        NODE_ENV: string | undefined,
    }   
}