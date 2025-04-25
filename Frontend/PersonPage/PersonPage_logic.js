fetch('/db/get-passes')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const passes = document.getElementById('passes');
        if (data.rows.length == 0) {
            const passDisplay = document.createElement("div");
            passDisplay.textContent = "NONE"
            passDisplay.style.textAlign = "center";
            passes.appendChild(passDisplay);
        } else {
            data.rows.forEach((pass) => {
                const passDisplay = document.createElement("div");
                passDisplay.textContent = pass.PassType;
                passDisplay.style.textAlign = "center";
                passes.appendChild(passDisplay);
            })
        }
        
    })

fetch('/db/find-tickets')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const tableDiv = document.getElementById('tickets-table');
        if (data.rows.length == 0) {
            const ticketsDisplay = document.createElement("div");
            ticketsDisplay.textContent = "NONE"
            ticketsDisplay.style.textAlign = "center";
            tableDiv.appendChild(ticketsDisplay);
        } else {
            const ticketsTable = document.createElement("table");
            const thead = document.createElement("thead");
    
                const thLotName = document.createElement("th");
                thLotName.textContent = "Lot Name";
                thead.appendChild(thLotName);
    
                const thLotType = document.createElement("th");
                thLotType.textContent = "Lot Type";
                thead.appendChild(thLotType);

                const thTimeIssued = document.createElement("th");
                thTimeIssued.textContent = "Time Issued";
                thead.appendChild(thTimeIssued);

                const thFee = document.createElement("th");
                thFee.textContent = "Fee";
                thead.appendChild(thFee);

                const thLateCharge = document.createElement("th");
                thLateCharge.textContent = "Late Charge";
                thead.appendChild(thLateCharge);

                const thTotal = document.createElement("th");
                thTotal.textContent = "Total";
                thead.appendChild(thTotal);

                const thPay = document.createElement("th");
                thPay.style.width = "60px";
                thPay.style.border = "none";
                thead.appendChild(thPay);

                ticketsTable.appendChild(thead);
            
            data.rows.forEach((row) => {
                const tr = document.createElement("tr");
                tr.setAttribute("ticketId", row.TicketID);

                const tdLotName = document.createElement("td");
                tdLotName.textContent = row.LotName;
                tr.appendChild(tdLotName);
    
                const tdLotType = document.createElement("td");
                tdLotType.textContent = row.LotType;
                tr.appendChild(tdLotType);

                const tdTimeIssued = document.createElement("td");
                tdTimeIssued.textContent = row.TimeIssued.replace(/(\d+)-0?(\d+)-0?(\d+)T(.*)\..*/g, "$2/$3/$1 - $4");
                tr.appendChild(tdTimeIssued);

                const tdFee = document.createElement("td");
                tdFee.textContent = "$" + row.Fee.toFixed(2);
                tr.appendChild(tdFee);

                const tdLateCharge = document.createElement("td");
                tdLateCharge.textContent = "$" + row.LateCharge.toFixed(2);
                tr.appendChild(tdLateCharge);

                const tdTotal = document.createElement("td");
                tdTotal.textContent = "$" + row.Total.toFixed(2);
                tr.appendChild(tdTotal);

                const tdPay = document.createElement("td");
                tdPay.style.border = "none";
                const payButton = document.createElement("button");
                payButton.textContent = "PAY";
                payButton.className = "pay-button";
                payButton.setAttribute("ticketId", row.TicketID);
                payButton.addEventListener("click", payClick);
                tdPay.appendChild(payButton);
                tr.appendChild(tdPay);

                ticketsTable.appendChild(tr);
            })
            tableDiv.appendChild(ticketsTable);
        }s
        
    })

function payClick(event) {
    const ticketId = event.target.getAttribute("ticketId");
    //add ticket payment functionality
    let req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticketId: ticketId
        })
    }
    fetch('/db/pay-ticket', req)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.rows.length == 0) {
                console.log("Ticket payment failed");
            } else {
                removeTicket(ticketId);
            }
        })
    
}

function removeTicket(ticketId) {
    const tableDiv = document.getElementById('tickets-table');
    const ticketsTable = tableDiv.children[0];
    for (let tr of ticketsTable.children) {
        if (tr.getAttribute("ticketId") == ticketId) {
            ticketsTable.removeChild(tr);
        }
    }
    //if all tickets paid
    if (ticketsTable.children.length == 1) {
        tableDiv.removeChild(ticketsTable);
        const ticketsDisplay = document.createElement("div");
        ticketsDisplay.textContent = "NONE"
        ticketsDisplay.style.textAlign = "center";
        tableDiv.appendChild(ticketsDisplay);
    }

}