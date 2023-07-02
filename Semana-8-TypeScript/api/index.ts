import { app } from "./config/express-config";
import { getEnv } from "./utils/functions/get-env";

const port = getEnv( "PORT" );

app.listen( port, () => {
    console.log( `O servidor está rodando na porta ${port}!` );
} );

