const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/get-codes', dbController.getCodes);

module.exports = router;