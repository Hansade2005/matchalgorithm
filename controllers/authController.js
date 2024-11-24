const Coach = require('../models/Coach');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller for handling coach signup
exports.signup = async (req, res) => {
  const { name, email, password, typeOfCoaching, bio, experience } = req.body;
  try {
    let coach = await Coach.findOne({ email });
    if (coach) {
      return res.status(400).json({ msg: 'Coach already exists' });
    }
    coach = new Coach({ name, email, password: await bcrypt.hash(password, 10), typeOfCoaching, bio, experience });
    await coach.save();
    const payload = { coach: { id: coach.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller for handling coach login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let coach = await Coach.findOne({ email });
    if (!coach) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, coach.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { coach: { id: coach.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};