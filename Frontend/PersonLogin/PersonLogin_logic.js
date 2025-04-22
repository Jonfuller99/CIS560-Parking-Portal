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

async function login() {
    let personPlate = document.getElementById('plate').value;
    let personStateCode = document.getElementById('state-code').value;

    let req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plate: personPlate,
            stateCode: personStateCode
        })
    }

    fetch('/auth/person-login', req)
        .then(res => {
            if (!res.ok) {
                const errorData = res.json();
                throw new Error(errorData.error);
            }
            return res.json(); // Convert to JSON    
        })
        .then(data => {
            // Use the data
            if (data.success) {
                document.cookie = `sessionId=${data.id}; path=/; max-age=3600; secure; samesite=strict`;
                window.location.href = '/person-page';
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error); // Handle errors
        });

}