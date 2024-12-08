const express = require('express');
const { createQuestion, getQuestions } = require('../controllers/questionHandle');

const router = express.Router();

// Create a new question
router.post('/', createQuestion);

// Get all questions
router.get('/', getQuestions);

module.exports = router;
