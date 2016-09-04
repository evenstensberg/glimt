const path = require('path');
const fs = require('fs');

module.exports = function hasConfig() {
  const cwd = process.cwd();
  var parts = cwd.split(path.sep);

  do {
    const loc = parts.join(path.sep);
    if (!loc) break;

    const glimtConfig = path.join(loc, '.glimtrc');
    if (fs.existsSync(glimtConfig)) {
      return [true, `Found config at ${glimtConfig}`];
    }
    parts.pop();
  } while (parts.length);

  return [false, 'Found no .glimtrc config'];
};
