"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_config_1 = require("./config/express-config");
const get_env_1 = require("./utils/functions/get-env");
const port = (0, get_env_1.getEnv)("PORT");
express_config_1.app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}!`);
});
