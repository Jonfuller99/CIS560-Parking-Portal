const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

console.log(pageController);

router.get('/', pageController.homepage);
console.log(1);
router.get('/person-login', pageController.personLogin);
console.log(2);
router.get('/officer-login', pageController.officerLogin);
console.log(3);
router.get('/person-page', pageController.personPage);
console.log(4);
router.get('/officer-page', pageController.officerPage);
console.log(5);