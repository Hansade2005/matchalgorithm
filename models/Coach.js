const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  typeOfCoaching: { type: String, required: true },
  expertise: [{ type: String, required: true }], // Match expertise with client needs
  maxClients: { type: Number, default: 5 },
  currentClients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
});

const Coach = mongoose.model('Coach', CoachSchema);
module.exports = Coach;
