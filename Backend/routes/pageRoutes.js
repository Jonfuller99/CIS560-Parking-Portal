const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.homepage);
router.get('/buy-pass', pageController.buyPass);
router.get('/person-login', pageController.personLogin);
router.get('/officer-login', pageController.officerLogin);
router.get('/person-page', pageController.personPage);
router.get('/officer-page', pageController.officerPage);

module.exports = router;