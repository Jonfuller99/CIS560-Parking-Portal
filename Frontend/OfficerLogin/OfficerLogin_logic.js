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
                window.location.href = '/officer-page';
            } else {
                showMessage("Invalid Officer Credentials", false);
                console.log(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error); // Handle errors
        });

}


function showMessage(text, isSuccess) {
    const message = document.getElementById('login-text');
    message.textContent = text;
    message.className = 'message-text ' + (isSuccess ? 'success' : 'error');
}