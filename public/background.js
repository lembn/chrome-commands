let json = "";

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup")
    port.onDisconnect.addListener(() => {
      chrome.storage.sync.set({ data: json });
    });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.includes("save::")) {
    console.log(message.slice(6));
    json = message.slice(6);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.includes("log::")) console.log(message.slice(5));
});
