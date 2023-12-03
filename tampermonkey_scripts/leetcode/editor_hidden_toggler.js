// ==UserScript==
// @name         leetcode editor hidden toggler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  press `alt + H` / `option + H` to hide/unhide editor content
// @author       stepanovep
// @match        https://leetcode.com/problems/*
// @grant        none
// ==/UserScript==


var editor;
var editorElemNotFoundYet = true;

function discoverEditorElem() {
    editor = document.querySelector('#editor');
    if (editorElemNotFoundYet && editor) {
        editorElemNotFoundYet = false;
        editor.hidden = true;
    }
}

const observer = new MutationObserver(discoverEditorElem);
observer.observe(document.documentElement, {childList: true, subtree: true});

discoverEditorElem();

document.addEventListener('keydown', function(event) {
    if (editor && event.altKey && event.code === 'KeyH') {
        console.log('Toggling editor hidden property');
        editor.hidden = !editor.hidden;
    }
});
