import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../../../database/index";
import { cargos } from "../../../../utils/constants/cargos";

export interface UsuarioInterface extends Model<InferAttributes<UsuarioInterface>, InferCreationAttributes<UsuarioInterface>> {
    id: CreationOptional<string>;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export const Usuario = sequelize.define<UsuarioInterface>( "Usuário", {
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
        values: [cargos.admin, cargos.user],
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

Usuario.sync( { alter: true, force: false } )
    .then( () => {
        console.log( "A Tabela de Usuários foi (re)criada!" );
    } )
    .catch( ( error ) => console.log( error ) );