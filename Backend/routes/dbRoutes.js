const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/get-codes', dbController.getCodes);
router.get('/find-tickets', dbController.findTickets);
router.get('/get-passes', dbController.getPasses);
router.post('/pay-ticket', dbController.payTicket);
router.get('/get-pass-prices', dbController.getPassPrices);
router.post('/buy-pass', dbController.buyPass);

module.exports = router;