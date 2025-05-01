const { sql, poolPromise } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const sessionModel = require('../models/sessionModel');
const crypto = require('crypto');

// Person login
exports.personLogin = async (req, res) => {
    const { plate, stateCode } = req.body;

    try {
        // Use the connection pool to execute query
        const pool = await poolPromise;
        const result = await pool.request()
            .input('plate', sql.NVarChar, plate)
            .input('stateCode', sql.NVarChar, stateCode)
            .execute('Parking.PersonLogin');

        if (result.recordset.length > 0) {
            const oldSession = sessionModel.getSession(req.cookies.sessionId);
            if (oldSession) sessionModel.logoutSession(req.cookies.sessionId);

            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 0, result.recordset[0].PersonID);
            res.json({ success: true, id: sessionId, state: 0 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid license info' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Officer login
exports.officerLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashPassword = await sha256Hash(password);

        // Use the connection pool to execute query
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashPassword)
            .execute('Parking.OfficerLogin');

        if (result.recordset.length > 0) {
            const oldSession = sessionModel.getSession(req.cookies.sessionId);
            if (oldSession) sessionModel.logoutSession(req.cookies.sessionId);

            const sessionId = uuidv4();
            sessionModel.setSession(sessionId, 1, result.recordset[0].OfficerID);
            res.json({ success: true, id: sessionId, state: 1 });
        } else {
            res.status(401).json({ success: false, message: 'Invalid officer credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Logout
exports.logout = (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session) {
        sessionModel.logoutSession(req.cookies.sessionId);
    }
    res.sendStatus(200);
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
