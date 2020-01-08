chrome.runtime.onMessage.addListener(function(absentPlayers) {
    window.absentPlayers = absentPlayers;
    chrome.tabs.create({url: 'absent_players.html'});
});
