const {sequelize} = require("../db");
const {Sequelize} = require("sequelize");

// define my cheese model
// title string
// description string


const Cheese = sequelize.define("cheese", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
});

module.exports = {
    Cheese
};