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
                stateCode: document.getElementById("state-code").value,
            })
            
        }

        fetch('/db/give-ticket', req)
        .then(res => {
            return res.json();
            // if (res.ok) {
            //     document.getElementById('purchase-text').textContent = "Ticket assigned";
            // } else {
            //     document.getElementById('purchase-text').textContent = "Error assigning ticket";
            // }
        })
        .then(data => {
            if (data.ticketGiven) {
                document.getElementById('purchase-text').textContent = `Ticket assigned - Fee: $${data.ticketFee.toFixed(2)}`;
            }
            else {
                document.getElementById('purchase-text').textContent = "No ticket available";
            }
        })      
        
    }
}
