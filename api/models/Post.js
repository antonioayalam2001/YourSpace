const { DataTypes } = require("sequelize");
const { mysqlDB } = require("../database/config");
const { User } = require("./User");

const Post = mysqlDB.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    desc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'https://picsum.photos/200/300'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    user__id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
}
);

Post.hasMany(User, { foreignKey: 'id', sourceKey: 'user__id' });

module.exports = { Post };