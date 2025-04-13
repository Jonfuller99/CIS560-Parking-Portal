const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController);

router.post('/officer-login', authController.officerLogin);
router.post('/person-login', authController.personLogin);
router.post('/logout', authController.logout);


module.exports = router;