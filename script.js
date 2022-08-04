let getToken = document.getElementById("getToken");

getToken.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyBearerToClipboard,
    });
    console.log('click')
  });
  
// The body of this function will be executed as a content script inside the
// current page
function copyBearerToClipboard() {
  console.log('prepared for copy')
  chrome.storage.sync.get('token', ({ token }) => {
      console.log(token)
  });
}