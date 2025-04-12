const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.homepage);
router.get('/person-login', pageController.personLogin);
router.get('/officer-login', pageController.officerLogin)