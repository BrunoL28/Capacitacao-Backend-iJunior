import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.sqlite',
});

export default sequelize;