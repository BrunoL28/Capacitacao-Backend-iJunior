const sequelize = require('../../../../database/Index');
const { DataTypes } = require('sequelize');
const Usuario = require('../../usuarios/models/Usuario');
const Musica = require('../../musicas/models/Musica');

const UsuarioMusica = sequelize.define('UsuarioMusica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});

Musica.belongsToMany(Usuario, { through: UsuarioMusica, onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Musica.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Musica);
Usuario.belongsToMany(Musica, { through: UsuarioMusica, onUpdate: 'CASCADE', onDelete: 'CASCADE'});
Usuario.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Usuario);

UsuarioMusica.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Usuarios e Musicas foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = UsuarioMusica;


