const readline = require('readline');
const fs = require('fs');

module.exports = function (dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      const rl = readline.createInterface({
        input: fs.createReadStream(`${dir}/${file}`)
      });
      rl.on('line', line => {
        rl.close();
        const output = fs.createWriteStream(`${dir}/${file}`);
        output.write(' ');
        output.close();
      });
    });
  });
};
