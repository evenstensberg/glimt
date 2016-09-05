const test = require('ava');
const outFile = require('../lib/out-file');
const outDir = require('../lib/out-dir');
const clearLine = require('../lib/clear-line')
const clearDir = require('../lib/clear-dir')

/* testing is not 100% as testing clutters the execution of the functions,
  some functions may not be compiled properly
*/

test('it should convert a line with a comment', t => {
  outFile('./example/ex.txt', "test")
   t.pass()
});

test('it should compile an entire directory', t => {
  outDir('./example', "test")
  t.pass()
});

test('it should clear a line', t => {
  clearLine('./example/ex.txt')
  t.pass()
})
test('it should clear a dir', t => {
  clearDir('./example')
  t.pass()
})
