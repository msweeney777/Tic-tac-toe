import fs from 'fs';

//Parses arguments from the command line:
const command = (process.argv.slice(2,3)).pop();
const x = (process.argv.slice(3,4)).pop();
const y = (process.argv.slice(4,5)).pop();

// The memory storage framework that is fed into the datastore.json file to
// properly store the given moves
let gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

// Turns the parsed inputs x and y into integers which can then be fed into
// the setMove() function where they will be placed on the board.
let currentMove = [];
let move = [];
move.push(x, y);
move[0] = parseInt(move[0], 10);
move[1] = parseInt(move[1], 10);

//Read and write state to disk
fs.readFile('main.mjs', (err, data) => {
  if (err) throw err;
  fs.writeFile('/tmp/test' , data, (err) => {
    if(err) throw err;
  })
})

//Connects the parsed command with its related function
if(command == "reset"){
  setDefault();
} else if (command == "help") {
  help();
} else if (command == "input") {
  setMove();
} else if (command == "show") {
  printBoard();
}

//Miscellaneous functions:
//
//Resets the game board
function setDefault() { 
  let data = JSON.stringify(gameBoard, null, 2);

  fs.writeFile('datastore.json', data, (err) => {
    if (err) throw err;
    console.log('Board reset');
  })
  printBoard();
}

function help() {
  console.log(`Commands: \n 'reset' - resets gameboard\n 'show' - prints gameboard`)
}

//Input functions:

function setMove() {
  fs.readFile('datastore.json', (err, data) => {
    if (err) throw err;
  gameBoard = JSON.parse(data);
  gameBoard[move[1] - 1] [move[0]-1] = "X"
  data = JSON.stringify(gameBoard, null, 2)
  fs.writeFile('datastore.json', data, (err) => {
    if (err) throw err;
    });
  printBoard();
  });
}

// Output functions:

function printBoard() {
  fs.readFile('datastore.json', (err, data) => {
    if (err) throw err;
    gameBoard = JSON.parse(data);
    
    console.log("                  ");
    console.log("       1   2   3   ")
    console.log("    ~~~~~~~~~~~~~ ")
    console.log("  1 | " + gameBoard[0][0] + " | " + gameBoard[0][1] + " | " + gameBoard[0][2] + " |")
    console.log("  2 | " + gameBoard[1][0] + " | " + gameBoard[1][1] + " | " + gameBoard[1][2] + " |")
    console.log("  3 | " + gameBoard[2][0] + " | " + gameBoard[2][1] + " | " + gameBoard[2][2] + " |")
    console.log("    ~~~~~~~~~~~~~ ")
    console.log("                        ")
    console.log("                        ")
  })
}
