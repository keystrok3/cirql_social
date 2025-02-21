
const { sequelize_instance } = require("../dbconfig/db");
const User = require("./users");


const models = [ User ];

const database_sync = async () => {
    for (let model of models) {
        try {
            await model.sync({ alter: true });
            console.log(`\n\nTable ${model.tableName} created\n\n`);
        } catch (error) {
            console.error(`\n\nTable Creattion Error: ${error}`);
        }
    }
}

module.exports = { database_sync };