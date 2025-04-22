const sessionModel = require('../models/sessionModel');
const path = require('path');

//homepage
exports.homepage = async (req, res) => {
    console.log("At homepage");
    const filePath = path.join(__dirname, '../../Frontend/Homepage/Homepage.html');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//buy pass
exports.buyPass = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/BuyPassPage/BuyPassPage.html');
    try {
        res.sendFile(filePath);
        console.log("At buy pass")
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//person login
exports.personLogin = async (req, res) => {
    let filePath;
    if (sessionModel.getSession(req.cookies.sessionId) == 0) {
        filePath = path.join(__dirname, '../../Frontend/PersonPage/PersonPage.html');
        console.log("At person page")
    } else {
        filePath = path.join(__dirname, '../../Frontend/PersonLogin/PersonLogin.html');
        console.log("At person login")
    } 
    
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//officer login
exports.officerLogin = async (req, res) => {
    let filePath;
    if (sessionModel.getSession(req.cookies.sessionId) == 1) {
        filePath = path.join(__dirname, '../../Frontend/OfficerPage/OfficerPage.html');
        console.log("At officer page")
    } else {
        filePath = path.join(__dirname, '../../Frontend/OfficerLogin/OfficerLogin.html');
        console.log("At officer login")
    } 

    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading page');
    }
};

//person page
exports.personPage = async (req, res) => {
    if (sessionModel.getSession(req.cookies.sessionId) == 0) { //if person
        const filePath = path.join(__dirname, '../../Frontend/PersonPage/PersonPage.html');
        try {
            res.sendFile(filePath);
            console.log("At person page")
        } catch (err) {
            res.status(500).send('Error loading page');
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid status' });
    }
};

//officer page
exports.officerPage = async (req, res) => {
    if (sessionModel.getSession(req.cookies.sessionId) == 1) { //if officer
        const filePath = path.join(__dirname, '../../Frontend/OfficerPage/OfficerPage.html');
        try {
            res.sendFile(filePath);
            console.log("At officer page")
        } catch (err) {
            res.status(500).send('Error loading page');
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid status' });
    }
};