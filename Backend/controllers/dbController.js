const { sql, poolPromise } = require('../config/db');
const sessionModel = require('../models/sessionModel');

exports.getCodes = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Parking.StateCodes');
        res.json({ rows: result.recordset });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLots = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Parking.Lots');
        res.json({ rows: result.recordset });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.findTickets = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 0) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('PersonID', sql.Int, session.dataID)
                .execute('Parking.FindTickets');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getPasses = async (req, res) => {
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 0) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('PersonID', sql.Int, session.dataID)
                .execute('Parking.GetPasses');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.payTicket = async (req, res) => {
    const {dateIssued, lotName} = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 0) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('DateIssued', sql.Date, dateIssued)
                .input('LotName', sql.VarChar, lotName)
                .input('PersonID', sql.Int, session.dataID)
                .execute('Parking.PayTicket');
            res.json({ rows: result.recordset });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getPassPrices = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT P.PassType, P.Price 
            FROM Parking.PassTypeYears P 
            WHERE P.YearOfValidity = YEAR(SYSDATETIME())
        `);
        res.json({ rows: result.recordset });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.buyPass = async (req, res) => {
    const { plate, stateCode, passType } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('LicensePlate', sql.VarChar, plate)
            .input('StateCode', sql.VarChar, stateCode)
            .input('PassType', sql.VarChar, passType)
            .execute('Parking.BuyPass');
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.giveTicket = async (req, res) => {
    const { plate, stateCode, lotName } = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 1) {
        try {
            const pool = await poolPromise;

            const checkResult = await pool.request()
                .input('LotName', sql.VarChar, lotName)
                .input('LicensePlate', sql.VarChar, plate)
                .input('StateCode', sql.VarChar, stateCode)
                .execute('Parking.CheckTicket');

            const checkRows = checkResult.recordset;

            if (checkRows.length === 0) {
                res.json({ ticketGiven: false });
            } else {
                await pool.request()
                    .input('LicensePlate', sql.VarChar, plate)
                    .input('StateCode', sql.VarChar, stateCode)
                    .execute('Parking.CreatePerson');

                await pool.request()
                    .input('LotName', sql.VarChar, lotName)
                    .input('LicensePlate', sql.VarChar, plate)
                    .input('StateCode', sql.VarChar, stateCode)
                    .input('OfficerID', sql.Int, session.dataID)
                    .execute('Parking.GiveTicket');

                res.json({ ticketGiven: true, ticketFee: checkRows[0].Fee });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getOfficerRank = async (req, res) => {
    const { month, year } = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 1) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Month', sql.Int, month)
                .input('Year', sql.Int, year)
                .execute('Parking.OfficerRank');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getTicketRevenue = async (req, res) => {
    const { startDate, endDate } = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 1) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StartDate', sql.DateTime, startDate)
                .input('EndDate', sql.DateTime, endDate)
                .execute('Parking.GetTicketRevenue');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getCommonPassType = async (req, res) => {
    const { startDate, endDate } = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 1) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StartDate', sql.DateTime, startDate)
                .input('EndDate', sql.DateTime, endDate)
                .execute('Parking.GetMostCommonPassType');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getPopularTicketDay = async (req, res) => {
    const { startDate, endDate } = req.body;
    const session = sessionModel.getSession(req.cookies.sessionId);
    if (session && session.type === 1) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StartDate', sql.DateTime, startDate)
                .input('EndDate', sql.DateTime, endDate)
                .execute('Parking.GetMostPopularTicketDay');
            res.json({ rows: result.recordset });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

