import fs from 'fs';

let gameBoard = [
[" ", " ", " "],
[" ", " ", " "],
[" ", " ", " "]
];

let currentMove = [];
let move = [];

//Read and write state to disk
fs.readFile('main.mjs', (err, data) => {
  if (err) throw err;
  fs.writeFile('/tmp/test' , data, (err) => {
    if(err) throw err;
  })
})

function setDefault() {

}
