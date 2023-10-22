chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("ea-sports-fc/ultimate-team/web-app")) {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW"
        });
    }
});