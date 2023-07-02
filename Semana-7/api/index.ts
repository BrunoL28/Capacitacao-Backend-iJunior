import { app } from './config/express-config';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});