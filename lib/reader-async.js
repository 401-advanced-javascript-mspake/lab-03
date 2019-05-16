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
const readOne = (file) => {
  return readFileWithPromises(file);
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
async function readAll(paths, callback) {

  let contents = [];
  for(let i = 0; i < paths.length; i++) {
    await readOne(paths[i]).then((data) => {
      console.log(`Read File ${i + 1}`);
      contents.push(data.toString().trim());
    }).catch((err) => {callback(err);});
  }
  callback(null, contents);
}
