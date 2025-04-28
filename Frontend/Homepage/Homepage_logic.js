async function logout() {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('/auth/logout', req)
        .catch(err => {
            console.error(err);
        });
}