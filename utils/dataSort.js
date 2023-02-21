// This is a function used to comb through our download of recipes and selectively seed our database.

const recipesDb = require('../seeds/db.json');
const fs = require('fs');

// Write to database function
const writeToDataBase = (notesDb) => {
  notesDb = JSON.stringify(notesDb);
  fs.writeFile("./db1.json", notesDb, (error) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("New NOTE was ADDED!");
    }
  });
};

const c = recipesDb[85];
const b = c[0]['bacon'];
let data = [];
console.log(c);

const search = (s) => {
  for (let i = 0; i < s.length; i++) {
    let recipe = s[i];
    data.push(recipe);
  }
  writeToDataBase(data);
};
search(b);