const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const sessionModel = require('../models/sessionModel');


//when a session starts
exports.startSession = (req, res) => {
    const sessionId = uuidv4();
    sessionModel.setSession(sessionId, 0); // on page, logged out
    res.json({ sessionId, state: 0 });
};

//when a logout occurs
exports.logout = (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
        sessionModel.setSession(sessionId, 0); // set to 0
        res.json({ message: 'Logged out' });
    } else {
        res.status(400).json({ error: 'Missing session ID' });
    }
};

//when a disconnect occurs
exports.disconnect = (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
        sessionModel.clearSession(sessionId); // delete session entirely
        res.json({ message: 'Disconnected' });
    } else {
        res.status(400).json({ error: 'Missing session ID' });
    }
};

//when officer log in occurs
exports.officerLogin = async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('CALL LoginOfficer(?, ?)', [username, password]);
        if (rows[0].length > 0) {
            sessionModel.setSession(sessionId, 2); //officer
            res.json({ success: true, sessionId, state: 2 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid officer credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
};

//when person login occurs
exports.personLogin = async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    const { plate, stateCode } = req.body;
    try {
        const [rows] = await db.query('CALL LoginPerson(?, ?)', [plate, stateCode]);
        if (rows[0].length > 0) {
            sessionModel.setSession(sessionId, 1); //person
            res.json({ success: true, sessionId, state: 1 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid license info' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
