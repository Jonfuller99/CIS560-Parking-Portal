const path = require('path');

//homepage
exports.homepage = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/Homepage/Homepage_logic.js');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};

//buy pass
exports.buyPass = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/BuyPassPage/BuyPassPage_logic.js');
    try {
        res.sendFile(filePath);
        console.log("At buy pass")
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};

//person login
exports.personLogin = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/PersonLogin/PersonLogin_logic.js');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};

//officer login
exports.officerLogin = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/OfficerLogin/OfficerLogin_logic.js');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};

//person page
exports.personPage = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/PersonPage/PersonPage_logic.js');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};

//officer page
exports.officerPage = async (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/OfficerPage/OfficerPage_logic.js');
    try {
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error loading js');
    }
};