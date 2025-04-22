const sessions = new Map();

const timerMS = 3600000;

function setSession(id, type) {
    // If there's already a session, clear its existing timer
    if (sessions.has(id)) {
        clearTimeout(sessions.get(id).timeout);
    }

    // Set a new timeout to auto-remove after 1 hour
    const timeout = setTimeout(() => {
        sessions.delete(id);
    }, timerMS);

    sessions.set(id, { type, timeout });
    console.log(sessions.entries());
}

function getSession(id) {
    const session = sessions.get(id);
    if (session) {
        clearTimeout(sessions.get(id).timeout);
        const timeout = setTimeout(() => {
            sessions.delete(id);
        }, timerMS);
        sessions.set(id, { type: session.type , timeout });
    }
    return session ? session.type : null;
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