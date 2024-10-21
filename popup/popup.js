document.getElementById("saveButton").addEventListener("click", () => {
  // This will trigger the content script to send JSON data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "saveJson" });
  });
});
