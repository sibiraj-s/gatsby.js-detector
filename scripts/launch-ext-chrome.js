import path from 'node:path';
import puppeteer from 'puppeteer';

const pathToExtension = path.join(__dirname, '..', 'build');
await puppeteer.launch({
  headless: false,
  args: [
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ],
});
