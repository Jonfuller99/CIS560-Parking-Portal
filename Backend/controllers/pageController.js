const sessionModel = require('../models/sessionModel');
const path = require('path');

//homepage
exports.homepage = (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/Homepage/homepage.html');
    res.sendFile(filePath);
}

//person login
exports.personLogin = (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/PersonLogin/PersonLogin.html');
    res.sendFile(filePath);
}

//officer login
exports.officerLogin = (req, res) => {
    const filePath = path.join(__dirname, '../../Frontend/OfficerLogin/OfficerLogin.html');
    res.sendFile(filePath);
}