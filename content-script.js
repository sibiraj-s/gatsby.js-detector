// check if site is built with gatsby
const isGatsbySite = !!document.getElementById('___gatsby');

if (isGatsbySite) {
  chrome.runtime.sendMessage({
    from: 'contentScript',
    subject: 'showPageAction',
    enableExtension: true,
  });
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.from === 'popup' && request.subject === 'DOMInfo' && sender.id) {
    // check if meta tag with generator info exists
    const isGeneratorInfoExists = !!document.querySelector('meta[name=generator]');
    // get Gatsby.js version from meta tag
    const gatsbyMetaInfo = isGeneratorInfoExists
      ? document.querySelector('meta[name=generator]').getAttribute('content')
      : undefined;

    // from https://github.com/sindresorhus/semver-regex/blob/master/index.js
    const semverRegexp = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/gi;

    const gatsbyVersion = semverRegexp.exec(gatsbyMetaInfo);
    response(gatsbyVersion);
  }
});
