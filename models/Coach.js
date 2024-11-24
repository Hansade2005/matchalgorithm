const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  typeOfCoaching: { type: String, required: true },
  bio: { type: String },
  experience: { type: Number }
});

const Coach = mongoose.model('Coach', CoachSchema);
module.exports = Coach;