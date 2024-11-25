 const mongoose = request('mongoose');


 const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    questionAnswers: {
        type: [String], // Array of possible answers
        required: true
    },
 });

 const Question = mongoose.model('Question', QuestionSchema);
 module.exports = Question; 