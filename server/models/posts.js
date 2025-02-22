
const { Model, DataTypes } = require('sequelize');
const User = require('./users');
const { sequelize_instance } = require('../dbconfig/db');

class Post extends Model {
    static associate(model) {
        Post.belongsTo(model.User, {
            foreignKey: 'username'
        })
    }
}  

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        }
    }
}, {
    sequelize: sequelize_instance,
    tableName: 'posts'
});


module.exports = Post;