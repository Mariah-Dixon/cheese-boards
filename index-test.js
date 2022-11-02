const {sequelize} = require("./db");
const {User, Board, Cheese} = require(".index");


describe ("Can insert data into User, Board, and Cheese Models", () => {
    beforeAll(async () => { // I believe the sync creates tables based on the model class
        await sequelize.sync({force: true}); // the tables are created each time the test is ran by setting the force to true 
    });



// Test create a User
test('can create a User', async () => {
    const newUser = await User.create({ 
        name: 'Mariah Dixon', 
        email: 'mariah@email.com'
    });
    expect(newUser.name).toBe('Mariah Dixon');
    expect(newUser.email).toBe('Mariah@email.com');
});

// Test create a Board
test ("can create a Board", async () => {
    const newBoard = await Board.create({
        type: "American Cheese Board",
        description: "can be paired with Red Wine and Preztel Crackers.",
        rating: 10
    });
    expect(newBoard.type).toBe("American Cheese Board");
    expect(newBoard.description).toBe("can be paired with Red Wine and Preztel Crackers.");
    expect(newBoard.rating).toBe(10);
});

// Test create a Cheese
test('can create cheeses', async () => {
    const newCheese = await Cheese.create({
        title:'Cheddar cheese', 
        description: 'Slightly buttery, moist, and a little melty.'
    });
    expect(newCheese.title).toBe('Cheddar cheese');
    expect(newCheese.description).toBe('Slightly buttery, moist, and a little melty.')
});

// One-to-Many 
test("A user can more than one Board", async () => {
    let newUser = {
        name: "Winnie",
        email: "Winnie@gmail.com"
    }

    let classicBoard = {
        type: "The classic Charcuterie",  
        description: "European-Inspired cheeses - all made in Southern California from goat, sheep, and cow's milk",  
        rating: 7     
    }

    let piqueBoard = {
        type: "The Pique Nique Charcuterie",  
        description: "It features fun cheeses, like flavored cheddars and mozzarella balls, more picnicky-style meats like mortadella and spicy coppa",  
        rating: 8   
    }

    let user1 = await User.create(newUser);
    let boardEntry = await Board.bulkCreate([classicBoard, piqueBoard]);

    let firstBoard = await boardEntry[0];
    let secondBoard = await boardEntry[1];

    await user1.addBoard(firstBoard);
    await user1.addBoard(secondBoard);

    let userBoard = await userEntry.getBoards();
    expect(userBoard.length).toBe(2);

});

// Many to Many 

test("Boards can have many cheeses and cheeses can be on many boards", async () => {
    
    let board1 = {
        type: "European Cheese Board", 
        description: "Fresh and mild soft cheese", 
        rating: 8       
    }

    let board2 = {
        type: "American Cheese Board", 
        description: "Mild, refreshing and supple", 
        rating: 7
    }

    let board3 = {
        type: "NorCal Cheese Board", 
        description: "Solid cheese with a sharp buttery flavor", 
        rating: 6
    }

    let cheese1 = {
        title: "Cheddar",  
        description: "relatively-hard"
    }

    let cheese2 = {
        title: "Provolone",  
        description: "semi-hard Italian cheese"
    }

    let cheese3 = {
        title: "Blue cheese",  
        description: "semi-soft cheese with sharp, salty flavor"
    }

    let cheeseList = await Cheese.bulkCreate([cheese1, cheese2, cheese3]);

        // Creating my Board Table Entries
        let boardList = await Board.bulkCreate([board1, board2, board3]);

        let firstBoard = await boardList[0];
        let secondBoard = await boardList[1];
        let thirdBoard = await boardList[2];

        let firstCheese = await cheeseList[0];
        let secondCheese = await cheeseList[1];
        let thirdCheese = await cheeseList[2];

        await firstBoard.addCheeses(firstCheese);
        await firstBoard.addCheeses(thirdCheese);
        await firstBoard.addCheeses(secondCheese);
        await thirdBoard.addCheeses(firstCheese);

        await firstCheese.addBoards(firstBoard);
        await firstCheese.addBoards(thirdBoard);
        await firstCheese.addBoards(secondBoard);
        await secondCheese.addBoards(thirdBoard);

        let board1Check = await firstBoard.getCheeses();

        let cheese1Check = await firstCheese.getBoards();
        
        expect(board1Check.length).toBe(3);
        expect(cheese1Check.length).toBe(3);   

    //Eager Loading 
    let loadedCheeseData = await Cheese.findAll({
        include: [{model: Board, as: "boards"}]
    });       
  
     expect(loadedCheeseData[1].boards.length).toBe(3);

    });
   

})
