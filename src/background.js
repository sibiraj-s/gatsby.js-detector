chrome.runtime.onMessage.addListener((request, sender) => {
  // check if the message is from content scripts
  if (request.from === 'gatsbyDetector' && request.subject === 'showPageAction') {
    const tabId = sender.tab.id;

    chrome.action.setIcon({
      tabId,
      path: {
        16: `images/${request.MODE}/gatsby-16x16.png`,
        32: `images/${request.MODE}/gatsby-32x32.png`,
        48: `images/${request.MODE}/gatsby-48x48.png`,
        128: `images/${request.MODE}/gatsby-128x128.png`,
      },
    });

    chrome.action.setPopup({
      tabId,
      popup: `popups/${request.MODE}.html`,
    });
  }
});
