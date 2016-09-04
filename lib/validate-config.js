const fs = require('fs');

const obj = JSON.parse(fs.readFileSync('.glimtrc', 'utf8'));
const lineNumber = [];
const query = [];
  for (let key in obj) {
    if (typeof obj[key][0] !== 'number') {
      throw new Error(`A lineNumber should be the first param, instead returned:
        ${typeof obj[key][0]}`);
    }
    if (typeof obj[key][1] !== 'string') {
      throw new Error(`A comment should be an string, instead returned:
        ${typeof obj[key][1]}`);
    } else {
      lineNumber.push(obj[key][0]);
      query.push(obj[key][1]);
    }
  }

  exports.query = query;
  exports.lineNumber = lineNumber;
