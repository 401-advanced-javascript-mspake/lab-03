'use strict';

jest.mock('fs');

const reader = require('../../lib/reader-promises.js');


describe('File Reader Using Promises', () => {

  it('when given a bad file, returns an error', done => {
    let files = ['bad.txt'];
    console.log(typeof reader);
    reader(files, (err,data) => {
      expect(err).toBeDefined();
      done();
    });
  });


  it('reads 3 files', done => {
    let files = ['file1.txt', 'file2.txt', 'file2.txt'];
    reader(files, (err,data) => {
      expect(err).toBeNull();
      expect(data instanceof Array ).toBeTruthy();
      expect(data.length ).toBe(3);
      done();
    });
  });

});
