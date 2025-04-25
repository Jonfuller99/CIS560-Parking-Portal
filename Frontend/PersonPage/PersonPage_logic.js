fetch('/db/find-tickets')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data.rows);
    })