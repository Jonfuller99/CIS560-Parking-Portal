let now = new Date();
let leaderboardMonth = now.getMonth() + 1;
let leaderboardYear = now.getFullYear();

let revenueMonth = now.getMonth() + 1;
let revenueYear = now.getFullYear();

function updateLeaderboard() {
    document.getElementById('leaderboard-date').innerHTML = `${leaderboardMonth}/${leaderboardYear}`;
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                leaderboardMonth,
                leaderboardYear
            })
    }
    fetch('/db/get-officer-rank', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let regexArray = [
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"}
            ];

            let isCurrencyArray = [
                false,
                false,
                false,
                false,
                true,
                false
            ];

            populateTable(data.rows, regexArray, isCurrencyArray, 'leaderboard');
        })
}

function updateTicketRevenue() {
    document.getElementById('ticket-revenue-date').innerHTML = `${revenueMonth}/${revenueYear}`;
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                revenueMonth,
                revenueYear
            })
    }
    fetch('/db/get-ticket-revenue', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let regexArray = [
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"}
            ];

            let isCurrencyArray = [
                false,
                true,
                false,
                true,
                true,
                false,
                true
            ];

            populateTable(data.rows, regexArray, isCurrencyArray, 'ticket-revenue');
        })
}

function pascalToTitle(text) {
    return text.replace(/([A-Z])/g, ' $1').trim();
}

function populateTable(dataArray, regexArray, isCurrencyArray, tableId) {
    const table = document.getElementById(tableId);

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("Data array is empty or not an array.");
        return;
    }

    // Clear existing table content
    table.innerHTML = "";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Get keys from the first object
    const keys = Object.keys(dataArray[0]);

    // Create header row
    const headerRow = document.createElement("tr");
    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = pascalToTitle(key);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create data rows
    dataArray.forEach( obj => {
        const row = document.createElement("tr");
        let i = 0;
        keys.forEach(key => {
            const td = document.createElement("td");
            if (isCurrencyArray[i]){
                td.textContent = `$${obj[key].toFixed(2)}`;
            } else {
                td.textContent = obj[key] ? obj[key].toString().replace(regexArray[i].regex, regexArray[i].replace): obj[key];
            }
            
            row.appendChild(td);
            i++;
        });
        tbody.appendChild(row);
    });

    // Append thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);
}

function dateDown() {

     console.log(document.getElementById("ticket-revenue-date").value);
}

function dateUp() {
    if (leaderboardMonth == 12) {
        leaderboardMonth = 1;
        leaderboardYear++;
    } else {
        leaderboardMonth++;
    }
    updateTables();
}

function updateTables(){
    updateLeaderboard();
    updateTicketRevenue();
}

updateTables();




