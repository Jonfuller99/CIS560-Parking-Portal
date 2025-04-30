function updateTicketRevenue() {
    let startDate = document.getElementById('tr-start-date').value;
    let endDate = document.getElementById('tr-end-date').value;
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate,
                endDate
            })
    }
    fetch('/db/get-ticket-revenue', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let regexArray = [
                {regex: /(\d+)-0?(\d+)-0?(\d+)T.*/g, replace: "$2/$3/$1"},
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

function updatePassType() {
    let startDate = document.getElementById('cpt-start-date').value;
    let endDate = document.getElementById('cpt-end-date').value;
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate,
                endDate
            })
    }
    fetch('/db/get-common-pass-type', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let regexArray = [
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"}
            ];

            let isCurrencyArray = [
                false,
                false,
                true
            ];

            populateTable(data.rows, regexArray, isCurrencyArray, 'common-pass-type');
        })
}

function updateTicketDay() {
    let startDate = document.getElementById('ptd-start-date').value;
    let endDate = document.getElementById('ptd-end-date').value;
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate,
                endDate
            })
    }
    fetch('/db/get-popular-ticket-day', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let regexArray = [
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"},
                {regex: /(\d+\.\d{4}).*/g, replace: "$1"},
                {regex: /(.*)/g, replace: "$1"}
            ];

            let isCurrencyArray = [
                false,
                false,
                false,
                true
            ];

            populateTable(data.rows, regexArray, isCurrencyArray, 'popular-ticket-day');
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




