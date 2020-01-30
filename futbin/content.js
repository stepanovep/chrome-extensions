const futbin_player_url_regexp = /.*\/player\/(\d+)\/.*/;

chrome.runtime.sendMessage({message: 'activate_icon'});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('content js');

    let allPlayersPromise = getAllPlayers(request.rating, request.max_price);
    let clubPlayersPromise = getClubPlayers(request.rating);

    Promise.all([allPlayersPromise, clubPlayersPromise]).then(function([allPlayers, clubPlayers]) {
        let absentPlayers = [];
        for (let playerId in allPlayers) {
            if (!clubPlayers.has(playerId)) {
                let player = allPlayers[playerId];
                absentPlayers.push(player);
            }
        }
        chrome.runtime.sendMessage({
            message: 'absent_players',
            absent_players: absentPlayers
        });
    });
});

async function getClubPlayers(rating) {
    let currentPagePlayers = [], all = [], page = 1;
    do {
        const url = `https://www.futbin.com/user/club/stats?page=${page}&player_rating=${rating}-${rating}`;
        currentPagePlayers = await getIdsFromPage(url);
        all = all.concat(currentPagePlayers);
        page++;
    } while(currentPagePlayers.length > 1);

    return new Set(all);
}

async function getIdsFromPage(url) {
    const doc = await getHTMLContent(url);
    const futbin_urls = doc.querySelectorAll('div > table > tbody > tr .td_name_cln_url');
    let futbin_ids = [];

    for (url of futbin_urls) {
        const futbin_id = getIdFromHref(url.href);
        if (futbin_id) {
            futbin_ids.push(futbin_id);
        }
    }
    return futbin_ids;
}

async function getAllPlayers(rating, price_max) {
    let allPlayers = {};
    let currentPagePlayers = [], page = 1;

    do {
        const url = `https://www.futbin.com/20/pgp?page=${page}&player_rating=${rating}-${rating}&pc_price=200-${price_max}}`;
        currentPagePlayers = await getPlayersFromPage(url);
        for (let player of currentPagePlayers) {
            let playerUrl = player.getAttribute('data-url');
            if (playerUrl != null) {
                let splits = player.querySelectorAll('td');
                const name = splits[0].textContent.trim();
                const rating = splits[1].textContent;
                const ratingTags = splits[1].querySelector('span').className;
                const type = ratingTags.replace(/rating|form/gi, '');
                const psPrice = splits[2].textContent;
                const xboxPrice = splits[3].textContent;
                const playerId = getIdFromHref(playerUrl);
                allPlayers[playerId] = {
                    name: name,
                    rating: rating,
                    type: type,
                    ps_price: psPrice,
                    xbox_price: xboxPrice,
                };
            }
        }
        console.log(`found players ${currentPagePlayers.length}`);
        page++;
    } while (currentPagePlayers.length > 1);

    return allPlayers;
}

function getIdFromHref(url) {
    const matches = url.match(futbin_player_url_regexp);
    if (matches.length > 0) {
        return matches[1];
    }

    return undefined;
}

async function getPlayersFromPage(url) {
    let doc = await getHTMLContent(url);
    console.log(doc);
    return doc.querySelectorAll('div > table > tbody > tr');
}

async function getHTMLContent(url) {
    console.log(`get HTML content of: ${url}`);
    let response = await fetch(url);
    let html = await response.text();
    let parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}
