import fs from 'fs';

//Global variable utilized in the printWinner and printBoard functions to
//imporve user experience
let player = "";
//Reads and writes state to local disk
fs.readFile('main.mjs', (err, data) => {
  if (err) throw err;
  fs.writeFile('/tmp/test' , data, (err) => {
    if(err) throw err;
  })
})

//Parses arguments from the command line:
let move = [];
const command = (process.argv.slice(2,3)).pop();
move[0] = (process.argv.slice(3,4)).pop();
move[1] = (process.argv.slice(4,5)).pop();
move[0] = parseInt(move[0], 10);
move[1] = parseInt(move[1], 10);

// Turn parsed string coordinates into integers
const x = parseInt(move[0], 10);
const y = parseInt(move[1], 10);

// The memory storage framework that is fed into the datastore.json file to
// properly store the given moves; includees an object that takes count of the
// number of turns that have transpired since the start of the game to
// effectively arbitrate whether it is the first or second player's turn
let gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
  {count: 0},
  {win: false},
  {tie: false}
];

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

  if(fs.existsSync('datastore.json')){
    fs.writeFileSync('datastore.json', data);
    printBoard();
  }
  fs.writeFileSync('datastore.json', data);

}
// Provides a menu supplying the commands and what they do
function help() {
  console.log(`Commands: \n 'reset' - resets gameboard\n 'show' - prints gameboard\n 'input' + [x-coordinate] + [y-coordinate]\n 'help' - shows a menu of commands and what they do`)
}

//Input functions:

//Takes the parsed coordinates and, based on whether or not the counter object
//in the json file is even or odd will assign an 'X' or an 'O' to given
//coordinate if it is not already occupied.
function setMove() {
let data;
  validMove();
  if(fs.existsSync('datastore.json')){
    data = fs.readFileSync('datastore.json');
  } else {
    setDefault();
    data = fs.readFileSync('datastore.json');
  }

  data = JSON.stringify(gameBoard, null, 2)
  fs.writeFileSync('datastore.json', data);
}

// Output functions:

// Imports the current game state from the datastore.json file and prints it
// out.
function printBoard() {
  let data = fs.readFileSync('datastore.json');
  gameBoard = JSON.parse(data);
  checkWinner();
  if(!gameBoard[4].win  && gameBoard[5].tie == false){
    currentPlayer();
  }
    console.log("           \n"+ player +"\n             ");
    console.log("       1   2   3   ")
    console.log("    ~~~~~~~~~~~~~ ")
    console.log("  1 | " + gameBoard[0][0] + " | " + gameBoard[0][1] + " | " + gameBoard[0][2] + " |")
    console.log("  2 | " + gameBoard[1][0] + " | " + gameBoard[1][1] + " | " + gameBoard[1][2] + " |")
    console.log("  3 | " + gameBoard[2][0] + " | " + gameBoard[2][1] + " | " + gameBoard[2][2] + " |")
    console.log("    ~~~~~~~~~~~~~ ")
    console.log("                        ")
    console.log("                       ")
}

function checkWinner() {
  if ((gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2] === "XXX") || (gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2] === "OOO") || ((gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0] === "XXX") || (gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0] === "OOO"))) {
    gameBoard[4].win = true;
    printWinner();
  } else if ((gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2] === "XXX") || (gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2] === "OOO") || (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] === "XXX") || (gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2] === "OOO") || (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] === "XXX") || (gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2] === "OOO")) {
    gameBoard[4].win = true;
    printWinner();
  } else if ((gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0] === "XXX") || (gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0] === "OOO") || (gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1] === "XXX") || (gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1] === "OOO") || (gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2] === "XXX") || (gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2] === "OOO")) {
    gameBoard[4].win = true;
    printWinner();
  } else if(gameBoard[3].count == 9) {
    gameBoard[5].tie = true;
    printWinner();
  }
}

function validMove() {
  let data = fs.readFileSync('datastore.json');
  gameBoard = JSON.parse(data);
  if(!isNaN(move[0]) && !isNaN(move[1])){
    if( ((x < 1) || (x > 3)) || (y < 1) || (y > 3)) {
      console.log("\nInvalid input: These coordinates are outside of the playable area.\n") 
    } else {
      if(gameBoard[3].count % 2 == 0) {
        gameBoard[move[1] - 1] [move[0]-1] = "X"
      } else {
        gameBoard[move[1] - 1] [move[0]-1] = "O"
      }
      gameBoard[3].count++;
      data = JSON.stringify(gameBoard, null, 2)
      fs.writeFileSync('datastore.json', data);
      printBoard();
    }
  } else if(isNaN(move[0]) || isNaN(move[1])) {
      console.log("\nInvalid input: Coordinates must be two integers seperated by a space.\n");
  } else if(isNaN(move[1])) {
    console.log("\nInvalid input: Second coordinate must be an integer. Please try again.\n")
  }
}

function printWinner () {
    if(gameBoard[5].tie) {
      player = 'Tie game!';
    } else if(gameBoard[3].count % 2 == 0) {
      player = 'Player two wins!';
    } else {
      player = 'Player one wins!';
    }
}

function currentPlayer () {
    if(gameBoard[3].count % 2 == 0)  {
      player = "Player one's turn." 
    } else {
      player = "Player two's turn."
    }
}
