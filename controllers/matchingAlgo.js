const Client = require('../models/Client');
const Coach = require('../models/Coach');

exports.assignCoachToClient = async (req, res) => {
  const { clientId } = req.body;

  try {
    // Fetch the client
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Find a suitable coach based on matching criteria
    const suitableCoach = await Coach.findOne({
      currentClients: { $lt: 5 }, // Coach must have less than 5 clients
      expertise: { $in: client.financialGoals },
      preferredClientIncomeRange: client.annualIncome,
      preferredClientConcerns: { $in: client.financialConcerns },
      preferredGender: { $in: [client.genderPreference, "No Preference"] },
      preferredEthnicity: { $in: [client.ethnicityPreference, "No Preference"] },
      preferredMaritalStatus: { $in: [client.maritalStatus, "Any"] },
    });

    if (!suitableCoach) {
      return res.status(404).json({ error: 'No suitable coach found' });
    }

    // Assign the coach to the client
    client.coachPreference = suitableCoach._id;
    await client.save();

    // Increment coach's currentClients
    suitableCoach.currentClients += 1;
    await suitableCoach.save();

    res.status(200).json({
      message: 'Coach assigned successfully',
      client,
      coach: suitableCoach,
    });
  } catch (err) {
    console.error('Error assigning coach:', err);
    res.status(500).json({ error: 'An error occurred while assigning the coach' });
  }
};
