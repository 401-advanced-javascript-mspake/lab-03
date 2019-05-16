const fs = require('fs');
const util = require('util');

let contents = [];

let readFileWithPromises = util.promisify(fs.readFile);

/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files, callback) => {
  //needs to return a promise
  // return new Promise( (resolve, reject) => {
  readAll([...files],callback);
  contents = [];
  // resolve(contents);
  // });
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file, callback) => {
  return readFileWithPromises(file);
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {

  let contents = [];
  readOne(paths[0])
    .then( data => {
      console.log('Read File 1');
      contents.push(data.toString().trim());
    })
    .catch(err => callback(err))
    .then( () => readOne(paths[1])
      .then( data => {
        console.log('Read File 2');
        contents.push(data.toString().trim());
      })
      .catch( err => callback(err))
      .then( () => readOne(paths[2]
        .then( data => {
          console.log('Read File 3');
          contents.push(data.toString().trim());
        }).catch(err => callback.failure())
        .then(result => callback(null, contents)) )));
};

