"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artista = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../../../database/index");
exports.Artista = index_1.sequelize.define("Artista", {
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
    nacionalidade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
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
exports.Artista.sync({ alter: true, force: false })
    .then(() => {
    console.log("A tabela de Artistas foi (re)criada!");
})
    .catch((error) => console.log(error));
