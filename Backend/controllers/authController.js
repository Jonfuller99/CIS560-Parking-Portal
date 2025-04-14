const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const sessionModel = require('../models/sessionModel');

//when person login occurs
exports.personLogin = async (req, res) => {
    const { plate, stateCode } = req.body;
    try {
        const [rows] = await db.query('EXEC PersonLogin @plate=:plate, @stateCode=:stateCode', {
            replacements: {
                plate,
                stateCode
            }
        })
        if (rows[0].length > 0) {
            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 0); //person
            res.json({ success: true, sessionId, state: 0 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid license info' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//when officer log in occurs
exports.officerLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('EXEC OfficerLogin @username=:username, @password=:password', {
            replacements: {
              username,
              password
            }
          });
        if (rows[0].length > 0) {
            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 1); //officer
            res.json({ success: true, sessionId, state: 1 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid officer credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
};

//when a logout occurs
exports.logout = async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
        sessionModel.logoutSession(sessionId); // delete session entirely
        res.json({ message: 'Disconnected' });
    } else {
        res.status(400).json({ error: 'Missing session ID' });
    }
};
