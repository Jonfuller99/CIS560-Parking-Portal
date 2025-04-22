const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.get('/', styleController.getStyle);

module.exports = router;