const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = path.join(__dirname, '..', 'build');
  await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
})();
