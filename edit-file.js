'use strict';

const fs = require('fs');

console.log(process.argv);

const file = process.argv[2];

let before;
let after;

const toAppend = `\nAppended data: ${Math.round(Math.random() * 100)}`;

fs.readFile(file, (err, data) => {
  if (err) {throw err;} 
  before = `\nBefore:\n${data.toString()}`;

  fs.appendFile(file, toAppend, (err, data) => {
    if(err) {throw err;}
    console.log(`appending to ${file}`);

    fs.readFile(file, (err, data) => {
      if (err) {throw err;} 
      after = `\n\nAfter:\n${data.toString()}`;

      console.log(before, after);
    });
    
  });
});



