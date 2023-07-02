"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMusica = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../../../database/index");
const Musica_1 = require("../../Musicas/models/Musica");
const Usuario_1 = require("../../Usuarios/models/Usuario");
exports.UsuarioMusica = index_1.sequelize.define("UsuárioMúsica", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario_1.Usuario,
            key: "id",
        },
    },
    idMusica: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Musica_1.Musica,
            key: "id",
        },
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
Musica_1.Musica.belongsToMany(Usuario_1.Usuario, { through: exports.UsuarioMusica });
Usuario_1.Usuario.belongsToMany(Musica_1.Musica, { through: exports.UsuarioMusica });
Musica_1.Musica.hasMany(exports.UsuarioMusica);
exports.UsuarioMusica.belongsTo(Musica_1.Musica);
Usuario_1.Usuario.hasMany(exports.UsuarioMusica);
exports.UsuarioMusica.belongsTo(Usuario_1.Usuario);
exports.UsuarioMusica.sync({ alter: true, force: false })
    .then(() => {
    console.log(" A tabela de UsuárioMúsica foi (re)criada!");
})
    .catch((error) => console.log(error));
