
const Follows = require("./follows");
const Post = require("./posts");
const User = require("./users");


const models = [ User, Post, Follows ];

/**
 * Sync models
*/
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