const SEARCH_BTN_SELECTOR = ".ut-pinned-list-container > div > .button-container > .btn-standard.call-to-action";
const BACK_TO_SEARCH_BTN_SELECTOR = ".ut-navigation-button-control";
const COMPARE_PRICE_BTN_TEXT = "Compare Price";
const SEND_TO_CLUB_BTN_TEXT = "Send to My Club";
const SEND_TO_TRANSFER_MARKET_BTN_TEXT = "Send to Transfer List";

(() => {
	document.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'KeyS':
                click(document.querySelector(SEARCH_BTN_SELECTOR));
                break;
            case 'KeyA':
                click(document.querySelector(BACK_TO_SEARCH_BTN_SELECTOR));
                break;
            case 'KeyC':
                click(getButtonByText(COMPARE_PRICE_BTN_TEXT));
                break;
            case 'KeyF':
                click(getButtonByText(SEND_TO_CLUB_BTN_TEXT));
                break;
            case 'KeyT':
                click(getButtonByText(SEND_TO_TRANSFER_MARKET_BTN_TEXT));
                break;
            default:
                break;
        }
	});
})();

function getButtonByText(text) {
    const spans = document.querySelectorAll("button > span[class='btn-text']");
    const span = Array.from(spans).find(span => span.textContent === text);
    return span ? span.parentElement : undefined;
}

function click(button) {
    if (!button || document.activeElement.localName === "input") {
        return;
    }
    triggerMouseEvent(button, "mouseover");
    triggerMouseEvent(button, "mousedown");
    triggerMouseEvent(button, "mouseup");
    triggerMouseEvent(button, "click");
}

function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}