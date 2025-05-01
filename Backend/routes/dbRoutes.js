const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/get-codes', dbController.getCodes);
router.get('/get-lots', dbController.getLots);
router.get('/find-tickets', dbController.findTickets);
router.post('/give-ticket', dbController.giveTicket);
router.get('/get-passes', dbController.getPasses);
router.post('/pay-ticket', dbController.payTicket);
router.get('/get-pass-prices', dbController.getPassPrices);
router.post('/buy-pass', dbController.buyPass);
router.post('/give-ticket', dbController.giveTicket);
router.get('get-lots', dbController.getLots);
router.post('/get-officer-rank', dbController.getOfficerRank);
router.post('/get-ticket-revenue', dbController.getTicketRevenue);
router.post('/get-common-pass-type', dbController.getCommonPassType);
router.post('/get-popular-ticket-day', dbController.getPopularTicketDay);

module.exports = router;