# gatsby.js-detector [![Tests](https://github.com/sibiraj-s/gatsby.js-detector/workflows/Tests/badge.svg)](https://github.com/sibiraj-s/gatsby.js-detector/actions)

> Extension to detect sites built with Gatsby.js

## Installation

- [Chrome Extension][chrome-marketplace]
- [Firefox Addon][firefox-marketplace]

Opera Users can [enable Chrome extensions](https://addons.opera.com/extensions/details/download-chrome-extension-9/)
and then install the [Chrome extension][chrome-marketplace]

## Development

Run `npm run dev` to watch script changes

To launch extension in Chrome. The launched Chrome instance is controlled by [puppeteer]

```bash
npm run launch:ext:chrome
```

To launch extension in Firefox. The launched Firefox instance is controlled by [web-ext]

```bash
npm run launch:ext:firefox
```

[chrome-marketplace]: https://chrome.google.com/webstore/detail/gatbsyjs-detector/ebnangjfmhfioccbaepehadakhiffapm/
[firefox-marketplace]: https://addons.mozilla.org/en-US/firefox/addon/gatbsy-js-detector/
[puppeteer]: https://github.com/GoogleChrome/puppeteer
[web-ext]: https://github.com/mozilla/web-ext
