const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/officer-login', authController.officerLogin);
router.post('/person-login', authController.personLogin);
router.post('/logout', authController.logout);


module.exports = router;