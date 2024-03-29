// check if site is built with gatsby
const isGatsbySite = Boolean(document.getElementById('___gatsby'));

// check if gatsby is running on development or on production mode
const isProduction = Boolean(document.querySelector('#gatsby-script-loader, #gatsby-chunk-mapping'));
const GATSBY_MODE = isProduction ? 'production' : 'development';

if (isGatsbySite) {
  chrome.runtime.sendMessage({
    from: 'gatsbyDetector',
    subject: 'showPageAction',
    enableExtension: true,
    MODE: GATSBY_MODE,
  });
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.from === 'popup' && request.subject === 'DOMInfo' && sender.id) {
    // check if meta tag with generator info exists
    const isGeneratorInfoExistsOnMeta = Boolean(document.querySelector('meta[name=generator]'));

    // get Gatsby.js version from meta tag
    const gatsbyGeneratorInfo = isGeneratorInfoExistsOnMeta
      ? document.querySelector('meta[name=generator]').getAttribute('content')
      : undefined;

    // from https://github.com/sindresorhus/semver-regex/blob/main/index.js
    const semverRegexp = /(?:(?<=^v?|\sv?)(?:(?:0|[1-9]\d{0,9})\.){2}(?:0|[1-9]\d{0,9})(?:-(?:0|[1-9]\d*?|[\da-z-]*?[a-z-][\da-z-]*?){0,100}(?:\.(?:0|[1-9]\d*?|[\da-z-]*?[a-z-][\da-z-]*?))*?){0,100}(?:\+[\da-z-]+?(?:\.[\da-z-]+?)*?){0,100}\b){1,200}/gi;

    const [gatsbyVersion] = semverRegexp.exec(gatsbyGeneratorInfo);
    const gatsbyInfo = {
      VERSION: gatsbyVersion,
      MODE: GATSBY_MODE,
    };
    response(gatsbyInfo);
  }
});
