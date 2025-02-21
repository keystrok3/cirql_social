
const { Sequelize } = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize_instance = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres',
        logging: true
    }
)


module.exports = { sequelize_instance }