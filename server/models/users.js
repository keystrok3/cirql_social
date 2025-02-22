
/**
 * User Model: creates table for user information
*/

const { Model, DataTypes } = require("sequelize");
const { sequelize_instance } = require("../dbconfig/db");
const Follows = require("./follows");


class User extends Model {
    static associate(model) {
        User.belongsTo(model.User, {
            foreignKey: 'user',
            through: Follows
        });

        User.belongsTo(model.User, {
            foreignKey: 'user_followed',
            through: Follows
        });
    }
}

User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    display_name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    profile_photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING
    }
}, {
    hooks: {
        beforeCreate: (user, options) => {
            user.display_name = `${user.firstName} ${user.lastName}`
        }
    },
    sequelize: sequelize_instance,
    tableName: 'usertable',
    updatedAt: false
})

module.exports = User