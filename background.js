// ############################## Context Menu #############################
const fetchData = async (text) => {
    const url = `http://localhost:5000/?text=${text}`;
    const options = {
        method: "GET",
    };
    console.log("Fetching data", url, options);
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        chrome.storage.local.set({ quotes: data }, () => {
            console.log("Value is set to: ");
            console.log(data);
        });
        // chrome.extension.onConnect.addListener(function (port) {
        //     console.log("Connected .....");
        //     port.onMessage.addListener(function (msg) {
        //         console.log("message recieved" + msg);
        //         port.postMessage("Hi Popup.js");
        //     });
        // });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
let contextMenuItem = {
    id: "captionIt",
    title: "CaptionIt",
    contexts: ["image"],
    documentUrlPatterns: ["*://*.instagram.com/*"],
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
                    fetchData(response);
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
