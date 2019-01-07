const setGatsbyVersion = (version) => {
  version && (document.getElementById('gatsbyVersion').textContent = `v${version}`);
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, setGatsbyVersion);
  });
});
