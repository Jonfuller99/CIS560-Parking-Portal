fetch('/db/get-passes')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data.rows);
        const passes = document.getElementById('passes');
        if (data.rows.length == 0) {
            const passDisplay = document.createElement("div");
            passDisplay.textContent = "NONE"
            passes.appendChild(passDisplay);
        } else {
            data.rows.forEach((pass) => {
                const passDisplay = document.createElement("div");
                passDisplay.textContent = pass.PassType;
                passes.appendChild(passDisplay);
            })
        }
        
    })

fetch('/db/find-tickets')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data.rows);
    })