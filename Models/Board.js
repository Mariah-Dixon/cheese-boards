const {sequelize} = require("../db");
const {Sequelize} = require("sequelize");

//define my board model
//type string
//description string
//rating number

const Board = sequelize.define("board", {
    type: Sequelize.STRING, 
    description: Sequelize.STRING, 
    rating: Sequelize.NUMBER          
});

module.exports = {
    Board
};