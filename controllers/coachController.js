const Coach = require('../models/Coach');

exports.createCoach = async (req, res) => {
  try {
    const coach = new Coach(req.body);
    const savedCoach = await coach.save();
    res.status(201).json(savedCoach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().populate('currentClients');
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
