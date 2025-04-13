const sessions = new Map();

function setSession(id, type) {
    sessions.set(id, { type });
}

function getSession(id) {
    return sessions.get(id) || null; // null = not on page
}

function logoutSession(id) {
    sessions.delete(id); // user closed tab
}

module.exports = {
    setSession,
    getSession,
    logoutSession
};