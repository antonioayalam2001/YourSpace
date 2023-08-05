const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'blog'
});

const mysqlDB = new Sequelize('blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = { mysqlDB };