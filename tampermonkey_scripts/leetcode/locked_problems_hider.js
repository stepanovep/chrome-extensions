// ==UserScript==
// @name         leetcode locked problems hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  press `rightAlt` at the page of problems to hide locked ones
// @author       stepanovep
// @match        https://leetcode.com/problemset/*
// @grant        none
// ==/UserScript==

var lockedProblems = new Set();

function initialize() {
    let elems = document.querySelectorAll('.question-list-table > table > tbody > tr');
    console.log('count: ' + elems.length);
    for (let elem of elems) {
        if (elem.querySelector('[data-original-title="Subscribe to unlock"]') != null) {
            lockedProblems.add(elem);
        }
    }

    console.log('locked problems: ' + lockedProblems.size);
}

const observer = new MutationObserver(initialize);
observer.observe(document.documentElement, {childList: true, subtree: true});

initialize();

document.addEventListener('keydown', function(event) {
    if (event.code === 'AltRight' && lockedProblems.size > 0) {
        console.log('Reverting locked problems hidden property: cnt=' + lockedProblems.size);
        lockedProblems.forEach(function(val1, val2, set) {
            val1.hidden = !val1.hidden;
        });
    }
});
