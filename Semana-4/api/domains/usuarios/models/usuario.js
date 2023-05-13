const sequelize = require('../../../database/index');
const {DataTypes} = require('sequelize');
const Musica = require('../../musicas/models/musica');
const Artista = require('../../artistas/models/artista');

const usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
    }
});

const MusicaEUsuario = sequelize.define('MusicaEUsuario', {});

Musica.belongsToMany(usuario, {as: 'usuarios', through: MusicaEUsuario});
Artista.belongsToMany(usuario, {as: 'musicas', through: MusicaEUsuario});

usuario.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de usuários foi (re)criada');
    }).catch((err) => console.log(err));

module.exports = usuario;