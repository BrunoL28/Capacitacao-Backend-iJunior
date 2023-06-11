import { app } from './config/express-config';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});