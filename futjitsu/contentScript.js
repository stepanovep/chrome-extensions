const SEARCH_BTN_SELECTOR = ".ut-pinned-list-container > div > .button-container > .btn-standard.call-to-action";
const BACK_TO_SEARCH_BTN_SELECTOR = ".ut-navigation-button-control";
const COMPARE_PRICE_BTN_TEXT = "Compare Price";
const SEND_TO_CLUB_BTN_TEXT = "Send to My Club";
const SEND_TO_TRANSFER_MARKET_BTN_TEXT = "Send to Transfer List";
const TOGGLE_WATCH_BTN_SELECTOR = ".ut-toggle-button-control.watch";
const BID_BTN_SELECTOR = ".bidButton";
const BUY_NOW_BTN_SELECTOR = ".buyButton";
const ACCEPT_DIALOG_BTN_SELECTOR = ".view-modal-container > .ea-dialog-view button";

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
            case 'ArrowUp':
                clickNextSibling('up');
                break;
            case 'ArrowDown':
                clickNextSibling('down');
                break;
            case 'KeyW':
                click(document.querySelector(TOGGLE_WATCH_BTN_SELECTOR));
                break;
            case 'KeyR':
                click(document.querySelector(BID_BTN_SELECTOR));
                break;
            case 'KeyH':
                click(document.querySelector(BUY_NOW_BTN_SELECTOR));
                setTimeout(() => {
                    click(document.querySelector(ACCEPT_DIALOG_BTN_SELECTOR));
                }, 100);
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

function clickNextSibling(direction) {
    const dx = direction === 'up' ? -1 : 1;
    const lis = document.querySelectorAll('li.listFUTItem');
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].classList.contains('selected')) {
            const nextIdx = i + dx;
            click(lis[nextIdx]);
            return;
        }
    }
}
