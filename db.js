const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");


// create my new Sequelize connection
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: path.join(__dirname,"db.sqlite"),
    logging: false
})

module.exports = {
    sequelize,
    Sequelize
};

