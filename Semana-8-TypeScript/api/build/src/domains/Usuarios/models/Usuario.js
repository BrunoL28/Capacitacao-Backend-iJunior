"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../../../database/index");
const cargos_1 = require("../../../../utils/constants/cargos");
exports.Usuario = index_1.sequelize.define("Usuário", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: sequelize_1.DataTypes.ENUM,
        values: [cargos_1.cargos.admin, cargos_1.cargos.user],
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
exports.Usuario.sync({ alter: true, force: false })
    .then(() => {
    console.log("A Tabela de Usuários foi (re)criada!");
})
    .catch((error) => console.log(error));
