const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

// Route for user login
router.post('/login', login);

// Route for user signup
router.post('/signup', signup);

module.exports = router;