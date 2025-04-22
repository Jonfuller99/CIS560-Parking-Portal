const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const sessionModel = require('../models/sessionModel');

//when person login occurs
exports.personLogin = async (req, res) => {
    const { plate, stateCode } = req.body;
    try {
        
        const [rows] = await db.query('EXEC Parking.PersonLogin @plate=:plate, @stateCode=:stateCode', {
            replacements: {
                plate,
                stateCode
            }
        })
        if (rows.length > 0) {
            //if person already has a status, remove it
            if (sessionModel.getSession(req.cookies.sessionId) != null) sessionModel.logoutSession(req.cookies.sessionId);
            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 0); //person
            res.json({ success: true, id: sessionId, state: 0 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid license info' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

//when officer log in occurs
exports.officerLogin = async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = sha256Hash(password);
    try {
        /*const [rows] = await db.query('EXEC Parking.OfficerLogin @username=:username, @password=:hashPassword', {
            replacements: {
              username,
              hashPassword
            }
          });
          */
        if (/*rows.length > 0*/ true) {
            //if person already has a status, remove it
            if (sessionModel.getSession(req.cookies.sessionId) != null) sessionModel.logoutSession(req.cookies.sessionId);
            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 1); //officer
            res.json({ success: true, id: sessionId, state: 1 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid officer credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
};

//hash function
async function sha256Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
