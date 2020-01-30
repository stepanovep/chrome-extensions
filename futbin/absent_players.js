document.addEventListener('DOMContentLoaded', function() {
    const bg = chrome.extension.getBackgroundPage();

    let tb = document.createElement('table');
    tb.setAttribute('class', 'content-table');
    let tbody = document.createElement('tbody');

    tb.appendChild(createHeader());

    for (let player of bg.absentPlayers) {
        const column = createColumn(player);
        tbody.appendChild(column);
    }

    tb.appendChild(tbody);
    document.body.appendChild(tb);
});

function createHeader() {
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    let nameHead = document.createElement('th');
    nameHead.textContent = 'Name';

    let ratingHead = document.createElement('th');
    ratingHead.textContent = 'Rating';

    let typeHead = document.createElement('th');
    typeHead.textContent = 'Type';

    let xboxPriceHead = document.createElement('th');
    xboxPriceHead.textContent = 'Xbox';

    let psPriceHead = document.createElement('th');
    psPriceHead.textContent = 'PS4';

    tr.append(nameHead, ratingHead, typeHead, xboxPriceHead, psPriceHead);
    thead.appendChild(tr);

    return thead;
}

function createColumn(player) {
    let nameCell = createCellWithText(player.name);
    let ratingCell = createCellWithText(player.rating);
    let typeCell = createCellWithText(player.type);
    let psPriceCell = createCellWithText(player.ps_price);
    let xboxPriceCell = createCellWithText(player.xbox_price);

    let column = document.createElement('tr');
    column.appendChild(nameCell);
    column.appendChild(ratingCell);
    column.appendChild(typeCell);
    column.appendChild(psPriceCell);
    column.appendChild(xboxPriceCell);

    return column;
}

function createCellWithText(text) {
    let cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}