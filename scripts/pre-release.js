const chalk = require('chalk');

const manifestJson = require('../src/manifest.json');
const pkgJson = require('../package.json');

if (manifestJson.version !== pkgJson.version) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Error: Version specified in \'package.json\' and \'manifest.json\' doesn\'t match'));
  process.exit(1);
}
