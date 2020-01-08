chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'activate_icon') {
        chrome.pageAction.show(sender.tab.id);
    }
});

chrome.runtime.onMessage.addListener(function(request) {
    if (request.message === 'absent_players') {
        window.absentPlayers = request.absent_players;
        chrome.tabs.create({url: 'absent_players.html'});
    }
});
