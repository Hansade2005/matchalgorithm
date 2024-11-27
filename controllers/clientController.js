const Client = require('../models/Client');
const Coach = require('../models/Coach');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('assignedCoach questionAnswers.question_ID');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Match a client to a coach
exports.matchClientToCoach = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);

    const coach = await Coach.findOne({
      typeOfCoaching: client.typeOfCoaching,
      currentClients: { $lt: '$maxClients' },
    });

    if (!coach) return res.status(404).json({ error: 'No available coach found' });

    client.assignedCoach = coach._id;
    coach.currentClients.push(client._id);

    await client.save();
    await coach.save();

    res.status(200).json({ message: 'Client matched successfully', coach });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
