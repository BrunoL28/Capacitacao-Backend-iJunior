import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/Index';
import { cargo } from '../../../../utils/constants/cargo';

export interface UsuarioInterface extends Model<InferAttributes<UsuarioInterface>, InferCreationAttributes<UsuarioInterface>> {
    id: CreationOptional<string>;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export const Usuario = sequelize.define<UsuarioInterface>('Usuario', {
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
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.ENUM,
        values: [cargo.ADMIN, cargo.USER],
        allowNull: false,
        defaultValue: cargo.USER,
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

Usuario.sync({ alter: true, force: false })
    .then(() => {
        console.log('Tabela de Usuários foi (re)criada!');
    })
    .catch((err) => console.log(err));