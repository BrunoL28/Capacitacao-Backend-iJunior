"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Musica = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../../../database/index");
const Artista_1 = require("../../Artistas/models/Artista");
exports.Musica = index_1.sequelize.define("Música", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    artistaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoria: {
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
exports.Musica.belongsTo(Artista_1.Artista, { foreignKey: "artistaId" });
Artista_1.Artista.hasMany(exports.Musica, { foreignKey: "artistaId" });
exports.Musica.sync({ alter: true, force: false })
    .then(() => {
    console.log("A tabela de Músicas foi (re)criada!");
})
    .catch((error) => console.log(error));
