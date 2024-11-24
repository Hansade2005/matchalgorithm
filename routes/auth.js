const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Sign up route for coaches
router.post('/signup', signup);

// Login route for coaches
router.post('/login', login);

module.exports = router;