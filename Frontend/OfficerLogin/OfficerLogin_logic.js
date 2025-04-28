async function login() {
    let officerUsername = document.getElementById('username').value;
    let officerPassword = document.getElementById('password').value;

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
                document.cookie = `officerId=${data.officerId}; path=/; max-age=3600; secure; samesite=strict`;
                window.location.href = '/officer-page';
            } else {
                document.getElementById('login-text').textContent = "Invalid Officer Credentials";
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error); // Handle errors
        });

}