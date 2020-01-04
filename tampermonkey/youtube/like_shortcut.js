// ==UserScript==
// @name         Youtube like button shortcut
// @version      0.1
// @description  Provides a shortcut to like a youtube video by pressing `Enter`
// @author       stepanovep
// @include      https://www.youtube.com/*
// @grant        none
// ==/UserScript==

let like_button;

function init() {
    if (!like_button) {
        let buttons = document.querySelectorAll('#top-level-buttons > ytd-toggle-button-renderer');
        if (buttons.length > 0) {
            like_button = buttons[0];
            console.log('like button found');
            return;
        }

        console.log('like button not found');
    }
}

const observer = new MutationObserver(init);
observer.observe(document.documentElement, {childList: true, subtree: true});

init();

document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter' && like_button) {
        like_button.click();
        console.log('like button clicked');
    }
});