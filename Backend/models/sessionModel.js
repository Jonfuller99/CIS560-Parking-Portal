const sessions = new Map();

function setSession(id, type) {
    sessions.set(id, type);
}

function getSession(id) {
    return sessions.get(id);
}

function logoutSession(id) {
    sessions.delete(id);
}

module.exports = {
    setSession,
    getSession,
    logoutSession
};