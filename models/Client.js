const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  questionAnswers: [
    {
      question_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      answerGiven_index: { type: Number, required: true },
    },
  ],
  assignedCoach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach', default: null },
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
