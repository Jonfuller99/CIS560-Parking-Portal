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

fetch('/db/get-pass-prices')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data.rows);
        const passTable = document.getElementById('pass-table');
        const thead = document.createElement("thead");

        const thPass = document.createElement("th");
        thPass.textContent = "Pass";
        thead.appendChild(thPass);

        const thPrice = document.createElement("th");
        thPrice.textContent = "Price";
        thead.appendChild(thPrice)

        const thBuy = document.createElement("th");
        thead.appendChild(thBuy)

        passTable.appendChild(thead);

        data.rows.forEach((row) => {
            if (row.PassType != 'W') {
                const tr = document.createElement("tr");
            
                const tdPass = document.createElement("td");
                tdPass.textContent = row.PassType;
                tr.appendChild(tdPass);

                const tdPrice = document.createElement("td");
                tdPrice.textContent = "$" + row.Price.toFixed(2);;
                tr.appendChild(tdPrice)

                const tdBuy = document.createElement("td");
                // tdBuy.style.border = "none";
                const buyButton = document.createElement("button");
                buyButton.setAttribute("passType", row.PassType);
                buyButton.textContent = "BUY";
                buyButton.className = "pay-button";
                buyButton.addEventListener("click", buyClick);
                tdBuy.appendChild(buyButton);
                tr.appendChild(tdBuy);

                passTable.appendChild(tr);
            }
        })
    })

function buyClick(event) {
    const passType = event.target.getAttribute("passType");
    if (document.getElementById("plate").value == "") {
        document.getElementById('purchase-text').textContent = "Must input a License Plate and State Code";
    } else {
        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plate: document.getElementById("plate").value.toUpperCase(),
                stateCode: document.getElementById("state-code").value,
                passType
            })
        }

        fetch('/db/buy-pass', req)
        .then(res => {
            if (res.ok) {
                document.getElementById('purchase-text').textContent = `${passType} Pass was successfully purchased`;
            } else {
                document.getElementById('purchase-text').textContent = "Error purchasing pass";
            }
        });
        
    }
    
}