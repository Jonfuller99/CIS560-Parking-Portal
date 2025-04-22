async function login() {
    let officerUsername = document.getElementById('username');
    let officerPassword = document.getElementById('password');

    let req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: officerUsername,
            password: officerPassword
        })
    }

    fetch('/auth/officer-login', req)
        .then(res => {
            return res.json(); // Convert to JSON    
        })
        .then(data => {
            // Use the data
            if (data.success) {
                document.cookie = `sessionId=${data.id}; path=/; max-age=3600; secure; samesite=strict`;
                window.location.href = '/officer-page';
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error); // Handle errors
        });

}