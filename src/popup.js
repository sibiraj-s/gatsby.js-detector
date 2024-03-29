const updateDOM = (info) => {
  const versionElement = document.getElementById('__version');
  versionElement.textContent = `v${info.VERSION}`;
};

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, updateDOM);
  });
});
