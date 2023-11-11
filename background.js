chrome.contextMenus.removeAll(() => {
  console.log('Removed menu items'); // Verify this logs
  // Create menu item
  chrome.contextMenus.create({
    id: 'meaning',
    title: 'Search its meaning in Google',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'meaning') {
    const text = encodeURI(info.selectionText);
    const googleUrl = `https://www.google.com/search?q=${text}+meaning&ie=UTF-8`;

    chrome.windows.create({
      url: googleUrl,
      // type: 'popup',
      width: 1300,
      height: 700
    });
  }
});