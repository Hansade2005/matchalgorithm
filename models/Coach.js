const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    ethnicity: String,
    ageRange: String,
    specialization: String, // Example: financial specialization
});

module.exports = mongoose.model('Coach', coachSchema);
