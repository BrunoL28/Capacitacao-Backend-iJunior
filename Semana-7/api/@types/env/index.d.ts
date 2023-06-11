declare namespace NodeJS {
    interface ProcessEnv {
        CLIENT_URL: string | undefined;
        PORT: string | undefined;
        DB_HOST: string | undefined;
        DB_PORT: string | undefined;
        DB_USERNAME: string | undefined;
        DB_PASSWORD: string | undefined;
        DB_NAME: string | undefined;
        SECRET_KEY: string | undefined;
        JWT_EXPIRATION: string | undefined;
    }
}