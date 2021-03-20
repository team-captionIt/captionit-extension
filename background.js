// ############################## Context Menu #############################
let contextMenuItem = {
    id: "captionIt",
    title: "CaptionIt",
    contexts: ["image"],
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
    console.log(clickData);
    if (clickData.menuItemId === "captionIt") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { getAltTextFromElementWithSrcURL: clickData.srcUrl },
                (response) => {
                    console.log(response);
                }
            );
        });
    }
});

// ############################## Page Action #############################
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (/instagram\.com/.test(tab.url)) {
        chrome.pageAction.show(tabId);
    }
});
