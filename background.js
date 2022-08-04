let token;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ token });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name.includes('Authorization') && details.requestHeaders[i].value.includes('Bearer ')) {
          token = details.requestHeaders[i].value.replace("Bearer ", "")
          chrome.storage.sync.set({ token });
          break;
        }
      }
      return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["requestHeaders"]
  );
