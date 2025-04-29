const express = require('express');
const router = express.Router();
const jsController = require('../controllers/jsController');

router.get('/', jsController.homepage);
router.get('/buy-pass', jsController.buyPass);
router.get('/person-login', jsController.personLogin);
router.get('/officer-login', jsController.officerLogin);
router.get('/person-page', jsController.personPage);
router.get('/officer-page', jsController.officerPage);
router.get('/stats-page', jsController.statsPage);

module.exports = router;