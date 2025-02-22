
const { Model, DataTypes } = require("sequelize");
const User = require("./users");
const { sequelize_instance } = require("../dbconfig/db");

class Follows extends Model {

}

Follows.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        }
    },
    user_followed: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        }
    }
}, {
    sequelize: sequelize_instance,
    tableName: 'follows'
})

module.exports = Follows;