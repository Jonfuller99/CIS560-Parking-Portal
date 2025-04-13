const sessionModel = require('../models/sessionModel');
const path = require('path');

//homepage
exports.homepage = async (req, res) => {
    console.log("Someone joined");
    const filePath = path.join(__dirname, '../../Frontend/Homepage/Homepage.html');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//person login
exports.personLogin = async (req, res) => {
    console.log("At person login")
    const filePath = path.join(__dirname, '../../Frontend/PersonLogin/PersonLogin.html');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//officer login
exports.officerLogin = async (req, res) => {
    console.log("At officer login")
    const filePath = path.join(__dirname, '../../Frontend/OfficerLogin/OfficerLogin.html');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//person page
exports.personPage = async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionModel.getSession(sessionId) == 0) { //if person
        const filePath = path.join(__dirname, '../../Frontend/PersonPage/PersonPage.html');
        try {
            res.sendFile(filePath);
        } catch (err) {
            res.status(500).send('Error loading page');
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid status' });
    }
};

//officer page
exports.officerPage = async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionModel.getSession(sessionId) == 1) { //if officer
        const filePath = path.join(__dirname, '../../Frontend/OfficerPage/OfficerPage.html');
        try {
            res.sendFile(filePath);
        } catch (err) {
            res.status(500).send('Error loading page');
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid status' });
    }
};