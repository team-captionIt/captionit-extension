const quote =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse corporis ullam, quam cupiditate suscipit!";
const author = "- Lorem, ipsum dolor.";
const quoteContainer = document.querySelector(".quote-container");
const writeToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.log(`Unable to write ${text}`, error);
    }
};
for (let i = 0; i < 5; i++) {
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
}
