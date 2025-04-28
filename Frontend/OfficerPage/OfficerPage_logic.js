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


function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Example usage:
const officerId = parseInt(getCookieValue('officerId'));


function giveTicketClick(event) {
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
                stateCode: document.getElementById("state-code").value,
                officerID: officerId
            })
            
        }

        fetch('/db/give-ticket', req)
        .then(res => {
            if (res.ok) {
                document.getElementById('purchase-text').textContent = "Ticket assigned";
            } else {
                document.getElementById('purchase-text').textContent = "Error assigning ticket";
            }
        });
        
    }
}
document.getElementById('submit-ticket-btn').addEventListener('click', giveTicketClick);