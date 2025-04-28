let now = new Date();
let month = now.getMonth() + 1;
let year = now.getFullYear();

fetch('/db/get-codes')
    .then(res => {
        return res.json();
    })
    .then(data => {
        let stateCodeSelect = document.getElementById('state-code');
        data.rows.forEach((row) => {
            let opt = new Option();
            opt.value = row.StateCode;
            opt.textContent = row.StateCode
            stateCodeSelect.appendChild(opt);
        })
    })

fetch('/db/get-lots')
.then(res => {
    return res.json();
})
.then(data => {
    let lotsSelect = document.getElementById('lots');
    data.rows.forEach((row) => {
        let opt = new Option();
        opt.value = row.LotName;
        opt.textContent = row.LotName
        lotsSelect.appendChild(opt);
    })
})

function updateLeaderboard() {
    const req = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                month,
                year
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


function giveTicketClick() {
    if (document.getElementById("plate").value == "") {
        document.getElementById('purchase-text').textContent = "Must input a License Plate and State Code";
    } else {
        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lotName: document.getElementById("lots").value,
                plate: document.getElementById("plate").value.toUpperCase(),
                stateCode: document.getElementById("state-code").value
            })
            
        }

        fetch('/db/give-ticket', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.ticketGiven) {
                document.getElementById('purchase-text').textContent = `Ticket assigned - Fee: $${data.ticketFee.toFixed(2)}`;
                updateLeaderboard();
            }
            else {
                document.getElementById('purchase-text').textContent = "No ticket available";
            }
        })  
        .catch(err => {
            document.getElementById('purchase-text').textContent = "No ticket available";
            console.log(err.error);
        })   
    }
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
                td.textContent = obj[key].toString().replace(regexArray[i].regex, regexArray[i].replace);
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


updateLeaderboard();