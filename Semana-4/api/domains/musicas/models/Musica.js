const sequelize = require('../../../database/Index');
const { DataTypes } = require('sequelize');

const Musica = sequelize.define('Musica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistaId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Musica.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = Musica;