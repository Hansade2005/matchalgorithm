const Question = require('../models/Question');

// Controller to create a new question
exports.createQuestion = async (req, res) => {
  const { questionText, questionAnswers } = req.body;

  // Validate the request body
  if (!questionText || !Array.isArray(questionAnswers) || questionAnswers.length === 0) {
    return res.status(400).json({
      error: '`questionText` is required, and `questionAnswers` must be a non-empty array.',
    });
  }

  try {
    const newQuestion = new Question({ questionText, questionAnswers });
    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      message: 'Question created successfully',
      question: savedQuestion,
    });
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ error: 'An error occurred while creating the question' });
  }
};

// Controller to get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
};

// Controller to get a question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ error: 'An error occurred while fetching the question' });
  }
};

// Controller to update a question by ID
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, questionAnswers } = req.body;

  // Validate the request body
  if (!questionText || !Array.isArray(questionAnswers) || questionAnswers.length === 0) {
    return res.status(400).json({
      error: '`questionText` is required, and `questionAnswers` must be a non-empty array.',
    });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, questionAnswers },
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({
      message: 'Question updated successfully',
      question: updatedQuestion,
    });
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'An error occurred while updating the question' });
  }
};

// Controller to delete a question by ID
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({
      message: 'Question deleted successfully',
      question: deletedQuestion,
    });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'An error occurred while deleting the question' });
  }
};
