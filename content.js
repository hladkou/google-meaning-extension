let selectionText = '';

document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString();
  if (selection) {
    selectionText = selection;
  }
});

if (chrome.windows) {
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.meaning) {
    const container = document.createElement('div');
    container.textContent = request.meaning;
    container.style.position = 'fixed';
    container.style.padding = '10px';
    container.style.backgroundColor = 'rgba(240, 240, 240, 0.9)';
    container.style.top = '10px';
    document.body.appendChild(container);

    setTimeout(() => {
      container.remove();
    }, 5000);
  }
});

chrome.windows.onRemoved.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const meaning = selectionText;
    chrome.tabs.sendMessage(tabs[0].id, { meaning });
  });
});
}

console.log('Content script loaded');