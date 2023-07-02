import { CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/Index';
import { Artista } from '../../artistas/models/Artista';
import { UsuarioInterface } from '../../usuarios/models/Usuario';

export interface MusicaInterface extends Model<InferAttributes<MusicaInterface>, InferCreationAttributes<MusicaInterface>> {
    id: CreationOptional<string>;
    foto: string;
    titulo: string;
    artistaId: string;
    categoria: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    addUsuario: HasManyAddAssociationMixin<UsuarioInterface, UsuarioInterface['id']>;
    removeUsuario: HasManyRemoveAssociationMixin<UsuarioInterface, UsuarioInterface['id']>;
}

export const Musica = sequelize.define<MusicaInterface>('Musica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Musica.belongsTo(Artista, { foreignKey: 'artistaId' });
Artista.hasMany(Musica, { foreignKey: 'artistaId' });

Musica.sync({ alter: false, force: false})
    .then(() => {
        console.log('Tabela de Músicas foi (re)criada.');
    })
    .catch((err) => console.log(err));