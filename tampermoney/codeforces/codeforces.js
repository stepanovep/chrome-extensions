// ==UserScript==
// @name         Codeforces problem tags hider
// @namespace    stepanovep
// @version      0.1
// @description  Hide/unhide codeforces problem tags by pressing RightAlt
// @author       stepanovep
// @match        http://codeforces.com/*
// @grant        none
// ==/UserScript==

var tagsDiv;

function initialize() {
    let elems = document.querySelectorAll('.roundbox.sidebox');
    for (let elem of elems) {
        if (elem.textContent.includes('Problem tags') || elem.textContent.includes('Теги задачи')) {
            tagsDiv = elem;
            tagsDiv.hidden = true;
            console.log('Tags div hidden');
            return;
        }
    }

    console.log('Tags div not found');
}

initialize();
let observer = new MutationObserver(initialize);
observer.observe(document.documentElement, {childList: true, subtree: true});

document.addEventListener('keydown', function(event) {
    console.log(event.code);
    if (event.code === 'AltRight' && tagsDiv) {
        console.log('Tags hidden reverted');
        tagsDiv.hidden = !tagsDiv.hidden;
    }
});