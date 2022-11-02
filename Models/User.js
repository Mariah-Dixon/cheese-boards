const {sequelize} = require("../db");
const {Sequelize} = require("sequelize");

//Define my User model 
//name string
//email string

const User = sequelize.define("users", {
    name: Sequelize.STRING, 
    email: Sequelize.STRING
});

module.exports = {
    User
}