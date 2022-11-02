const {User} = require('./User')
const {Board} = require('./Board')
const {Cheese} = require('./Cheese')


//Associate the User and Board models with a One-to-Many relationship
//Multiple Boards can be added to a User.
//add test(s) to account for the association.

User.hasMany(Board);
Board.belongsTo(User);


//Associate the Board and Cheese models with a Many-to-Many relationship.
//A Board can have many Cheeses
//A Cheese can be on many Boards
//Add test(s) to account for the association.

Board.belongsToMany(Cheese, {through:"board_cheese"});
Cheese.belongsToMany(Board, {through:"board_cheese"});




module.exports = {
    User,
    Board,
    Cheese
};