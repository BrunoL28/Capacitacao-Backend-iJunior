const sequelize = require('../../../database/Index');
const { DataTypes } = require('sequelize');
const Musica = require('../../musicas/models/Musica');

const Usuario = sequelize.define('Usuario', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
    },
});

Usuario.hasMany(Musica, {as: 'musicas'});
 
Usuario.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Usuários foi (re)criada');
    }) 
    .catch((err) => console.log(err));

module.exports = Usuario;