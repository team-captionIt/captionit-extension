let loading = true;
const renderQuote = (author, quote) => {
    // const quote =
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse corporis ullam, quam cupiditate suscipit!";
    // const author = "- Lorem, ipsum dolor.";
    const quoteContainer = document.querySelector(".quote-container");
    const writeToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.log(`Unable to write ${text}`, error);
        }
    };
    const quoteElement = document.createElement("div");
    quoteElement.className = "quote";
    quoteElement.dataset.quoteContent = quote + " " + author;
    const quoteTextElement = document.createElement("div");
    quoteTextElement.className = "quote-text";
    quoteTextElement.innerText = quote;
    quoteElement.appendChild(quoteTextElement);

    const seperator = document.createElement("div");
    seperator.className = "seperator";

    const copyButton = document.createElement("input");
    copyButton.type = "image";
    copyButton.src = "assets/copy.svg";
    copyButton.addEventListener("click", () => {
        const content =
            copyButton.parentElement.parentElement.dataset.quoteContent;
        writeToClipboard(content);
        const x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(() => {
            x.className = x.className.replace("show", "");
        }, 3000);
    });
    copyButton.className = "copy-button";
    seperator.appendChild(copyButton);

    const authorElement = document.createElement("span");
    authorElement.className = "quote-author";
    authorElement.innerText = author;
    seperator.appendChild(authorElement);

    quoteElement.appendChild(seperator);
    quoteContainer.appendChild(quoteElement);
};
const checkData = () => {
    chrome.storage.local.get(["quotes"], (result) => {
        console.log("Value is currently: " + result.quotes, result);
        if (result.quotes !== undefined) {
            const loadingElement = document.querySelector(".loading");
            loadingElement.classList.add("remove");
            const quoteContainer = document.querySelector(".quote-container");
            quoteContainer.classList.remove("remove");
            for (let author in result.quotes) {
                const quote = result.quotes[author];
                renderQuote(author, quote);
            }
        }
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            var storageChange = changes[key];
            console.log(
                'Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue
            );
            console.log(storage.newValue);
        }
    });
};
console.log(chrome);
checkData();
// for (let i = 0; i < 5; i++) {
//     renderQuote(
//         "- Lorem, ipsum dolor.",
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse corporis ullam, quam cupiditate suscipit!"
//     );
// }
// chrome.runtime.onMessage.addEventListener((request, sender, sendResponse) => {
//     console.log(request);
//     if (request.message === "loading") {
//         console.log("loading");
//         const loadingElement = document.querySelector(".loading");
//         const quoteContainer = document.querySelector(".quote-container");
//         loadingElement.classList.add("remove");
//         quoteContainer.classList.remove("remove");
//     } else if (request.message === "completed") {
//         console.log("completed");
//         const loadingElement = document.querySelector(".loading");
//         const quoteContainer = document.querySelector(".quote-container");
//         loadingElement.classList.remove("remove");
//         quoteContainer.classList.add("remove");
//     }
//     if (request.data !== undefined) {
//         console.log(request.data);
//         for (author of data) {
//             const quote = request.data[author];
//             renderQuote(author, quote);
//         }
//     }
// });
