const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Define routes and map them to controller functions
router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

module.exports = router;
