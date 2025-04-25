const sessions = new Map();

const timerMS = 3600000;

function setSession(id, type, dataID) {
    // If there's already a session, clear its existing timer
    if (sessions.has(id)) {
        clearTimeout(sessions.get(id).timeout);
    }

    // Set a new timeout to auto-remove after 1 hour
    const timeout = setTimeout(() => {
        sessions.delete(id);
    }, timerMS);

    sessions.set(id, { type, dataID, timeout});
}

function getSession(id) {
    const session = sessions.get(id);
    if (session) {
        clearTimeout(sessions.get(id).timeout);
        const timeout = setTimeout(() => {
            sessions.delete(id);
        }, timerMS);
        sessions.set(id, { type: session.type, dataID: session.dataID , timeout });
    }
    return session ? session : null;
}

function logoutSession(id) {
    clearTimeout(sessions.get(id).timeout);
    sessions.delete(id);
}

module.exports = {
    setSession,
    getSession,
    logoutSession
};