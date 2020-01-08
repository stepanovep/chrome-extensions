document.addEventListener('DOMContentLoaded', function() {
    const bg = chrome.extension.getBackgroundPage();

    let tb = document.createElement('table');
    tb.style.width = '25%';
    tb.setAttribute('border', '1');
    let tbody = document.createElement('tbody');

    for (let player of bg.absentPlayers) {
        // const div = document.createElement('div');
        // div.textContent = `${player.name} (${player.type}), ps: ${player.ps_price}, xbox: ${player.xbox_price}`;
        // document.body.appendChild(div);
        const column = createColumn(player);
        tbody.appendChild(column);
    }

    tb.appendChild(tbody);
    document.body.appendChild(tb);
});

function createColumn(player) {
    let nameCell = createCellWithText(player.name);
    let typeCell = createCellWithText(player.type);
    let psPriceCell = createCellWithText(player.ps_price);
    let xboxPriceCell = createCellWithText(player.xbox_price);

    let column = document.createElement('tr');
    column.appendChild(nameCell);
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