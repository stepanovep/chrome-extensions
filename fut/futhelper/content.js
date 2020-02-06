
chrome.runtime.sendMessage({message: 'activate_icon'});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content js');

    let containers = document.querySelectorAll('.itemList');
    let soldContainer = containers[0];
    let unsoldContainer = containers[1];
    let availableContainer = containers[2];
    let activeContainer = containers[3];

    let unsoldItems = unsoldContainer.querySelectorAll('li.listFUTItem');

});