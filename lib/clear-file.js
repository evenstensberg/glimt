const readline = require('readline');
const fs = require('fs');

module.exports = function (dir) {
  const rl = readline.createInterface({
    input: fs.createReadStream(dir)
  });
  rl.on('line', line => {
    rl.close();
    const output = fs.createWriteStream(dir);
    output.write(' ');
    output.close();
  });
};
