const readline = require('readline');
const fs = require('fs');
const query = require('./validate-config').query;
const lineNumber = require('./validate-config').lineNumber;

module.exports = function (dir, comment) {
    fs.readdir(dir, (err, files) => {
      files.forEach(file => {
        const rl = readline.createInterface({
          input: fs.createReadStream(`${dir}/${file}`)
        });

      let counter = 0;
      let val = 0;

      rl.on('line', line => {
        ++counter;
        val += line.trim().toString().length;

        lineNumber.filter(lines => {
          if (lines === counter) {
            query.filter(pair => {
              if (pair === line) {
                rl.close();

                const options = {
                  flags: 'r+',
                  defaultEncoding: 'utf8',
                  start: val - (pair.length - counter - 2),
                  mode: 0o666
                };
                const output = fs.createWriteStream(`${dir}/${file}`, options);
                const outstring = ' ';

                output.write(outstring.repeat(pair.length));
                output.close();

                const newPut = fs.createWriteStream(`${dir}/${file}`, {
                  flags: 'r+',
                  defaultEncoding: 'utf8',
                  start: val - (pair.length - counter),
                  mode: 0o666
                });

                newPut.write('\n /* '+comment + ' */ \n');
                newPut.close();
              }
              return true;
            });
          }
          return true;
        });
      });
    });
  });
};
