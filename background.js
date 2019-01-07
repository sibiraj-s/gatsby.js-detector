chrome.runtime.onMessage.addListener((request, sender) => {
  // check if the message is from content scripts
  if (request.from === 'contentScript' && request.subject === 'showPageAction') {
    const tabId = sender.tab.id;

    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        16: 'images/gatsby-16x16.png',
        32: 'images/gatsby-32x32.png',
        48: 'images/gatsby-48x48.png',
      },
    });

    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popups/gatsby-enabled.html',
    });
  }
});
