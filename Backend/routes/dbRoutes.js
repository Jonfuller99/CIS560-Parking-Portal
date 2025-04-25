const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/get-codes', dbController.getCodes);
router.get('/find-tickets', dbController.findTickets);

module.exports = router;