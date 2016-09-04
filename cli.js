#!/usr/bin/env node --harmony
const commander = require('commander');
const updateNotifier = require('update-notifier')
const debug = require('debug')('glimt');
const chalk = require('chalk');
const hasConfig = require('./lib/glimt-config');

commander.version(require('./package.json').version);

commander.usage('[options] <source>');
commander.option('-n  --clear-dir', 'clear each file in a directory');
commander.option('-f  --clear-file', 'clear one file');
commander.option('-l  --clear-line', 'clear one line in a file');
commander.option('-o, --out-file', 'compile a given file in a directory');
commander.option('-d, --out-dir', 'compile a given directory of files');
commander.parse(process.argv);

if (debug.enabled) {
  require('time-require');
}

if (!hasConfig()) {
  console.log(chalk.bgBlue('\nERROR:'), chalk.red.bold('\nFound no .comradrc file at run'));
  console.log(chalk.red.italic('Set up a .comradrc file to avoid this message'));
  process.exit(0);
}

updateNotifier({pkg: require('./package.json')}).notify();

if (commander.clearLine) {
  const file = process.argv.slice(2)[1];

  if (!file) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red.bold('No file supplied as argument'));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -l ex/output.js\n'));
    process.exit(0);
  } else {
    require('./lib/clear-line')(file);
  }
}

if (commander.clearFile) {
  const file = process.argv.slice(2)[1];
  if (!file) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red.bold('No file supplied as argument'));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -f ex/output.js\n'));
    process.exit(0);
  } else {
    require('./lib/clear-file')(file);
  }
}

if (commander.clearDir) {
  const dir = process.argv.slice(2)[1];
  if (!dir) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red.bold('No directory supplied as argument'));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -n ex\n'));
    process.exit(0);
  } else {
    require('./lib/clear-dir')(dir);
  }
}

if (commander.outDir) {
  const dir = process.argv.slice(2)[1];
  const comment = process.argv.slice(2)[2];

  if (!dir) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red.bold('No directory supplied as argument'));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -d ex thisIsAComment\n'));
    process.exit(0);
  }
  if (!comment) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red("\nno comment or directory supplied as argument"));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -d ex thisIsAComment\n'));
    process.exit(0);
  } else {
    require('./lib/out-dir')(dir, comment);
  }
}

if (commander.outFile) {
  const file = process.argv.slice(2)[1];
  const comment = process.argv.slice(2)[2];

  if (!comment) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red("\nno comment or file supplied as argument"));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -o ex/output.js thisIsAComment\n'));
    process.exit(0);
  }
  if (!file) {
    console.log(chalk.bgBlue('\nERROR:'), chalk.red('\nNo file supplied as argument'));
    console.log(chalk.red.underline('\nYour CLI command should look like this:\n'));
    console.log(chalk.bold.yellow('glimt -o ex/output.js thisIsAComment\n'));
    process.exit(0);
  } else {
    require('./lib/out-file')(file, comment);
  }
}
