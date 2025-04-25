const db = require('../config/db');
const sessionModel = require('../models/sessionModel');

exports.getCodes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Parking.StateCodes');
        res.json({ rows })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.findTickets = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
        if (session && session.type == 0) {
        try {
            const [rows] = await db.query('EXEC Parking.FindTickets @PersonID=:personID', {
                replacements: {
                    personID: session.dataID
                }
            });
            res.json({ rows })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }
}


exports.getPasses = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
        if (session && session.type == 0) {
        try {
            console.log(session.dataID);
            const [rows] = await db.query('EXEC Parking.GetPasses @PersonID=:personID', {
                replacements: {
                    personID: session.dataID
                }
            });
            res.json({ rows })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }
}