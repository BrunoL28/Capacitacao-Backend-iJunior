const app = require('../api/config/express-config');

const port = process.env.PORT;

app.listen(port, console.log(`Server is running on port ${port}`));

