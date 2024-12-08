const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionAnswers: [{ type: String, required: true }],
  category: { type: String, required: true }, // e.g., "Budgeting", "Saving"
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
