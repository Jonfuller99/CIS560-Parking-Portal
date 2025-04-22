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