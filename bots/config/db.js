const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.mySqlDatabase, config.mySqlUser, config.mySqlPassword, {
    dialect: config.dialect,
    host: config.mySqlHost,
    dialectOptions: config.dialectOptions
});
const db = {};

db.sequelize = sequelize;

module.exports = db;