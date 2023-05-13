const sequelize = require('../../../database/index');
const {DataTypes} = require('sequelize');

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

usuario.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de usuários foi (re)criada');
    }).catch((err) => console.log(err));

module.exports = usuario;