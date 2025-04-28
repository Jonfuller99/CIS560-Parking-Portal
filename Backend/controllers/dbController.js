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

exports.getLots = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Parking.Lots');
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

exports.payTicket = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type == 0) {
        try {
            console.log(req.body.ticketId);
            const [rows] = await db.query('EXEC Parking.PayTicket @TicketID=:ticketID, @PersonID=:personID', {
                replacements: {
                    ticketID: req.body.ticketId,
                    personID: session.dataID
                }
            });
            res.json({ rows })
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }
}

exports.getPassPrices = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT P.PassType, P.Price FROM Parking.PassTypeYears P WHERE P.YearOfValidity = Year(SYSDATETIME())');
        res.json({ rows })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.buyPass = async (req, res) => {
    const { plate, stateCode, passType } = req.body;
    try {
        await db.query('EXEC Parking.BuyPass @LicensePlate=:plate, @StateCode=:stateCode, @PassType=:passType', {
            replacements: {
                plate,
                stateCode,
                passType
            }
        })
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


exports.giveTicket = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type == 1) {
        const { lotName, plate, stateCode } = req.body;
        try {
            await db.query('EXEC Parking.GiveTicket @LotName=:lotName, @LicensePlate=:plate, @StateCode=:stateCode, @OfficerID=:officerID', {
                replacements: {
                    lotName,
                    plate,
                    stateCode,
                    officerID: sessionId.dataID
                }
            })
            res.sendStatus(200);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }
}