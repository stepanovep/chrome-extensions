// ==UserScript==
// @name         Codeforces problem tags hider
// @namespace    codeforces
// @version      0.1
// @description  Hide/unhide codeforces problem tags by pressing RightAlt
// @include      https://codeforces.com/*
// @include      http://codeforces.com/*
// @grant        none
// @author       stepanovep
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

document.addEventListener('keydown', function(event) {
    if (event.code === 'AltRight' && tagsDiv) {
        console.log('Tags hidden reverted');
        tagsDiv.hidden = !tagsDiv.hidden;
    }
});