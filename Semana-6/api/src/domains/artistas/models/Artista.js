const sequelize = require('../../../../database/Index');
const { DataTypes } = require('sequelize');

const Artista = sequelize.define('Artista', {
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
    },
});

Artista.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Artistas foi (re)criada');
    })
    .catch((err)=>console.log(err));

module.exports = Artista;