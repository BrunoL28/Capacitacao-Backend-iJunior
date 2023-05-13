const sequelize = require('../../../database/index');
const { DataTypes } = require('sequelize');
const Musica = require('../../musicas/models/musica');

const artista = sequelize.define('Artista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nacionalidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

artista.hasMany(Musica, {as: 'musicas', foreignKey: 'artistaId'});

artista.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Artistas foi (re)criada');
    }).catch((err) => console.log(err));

module.exports = artista;