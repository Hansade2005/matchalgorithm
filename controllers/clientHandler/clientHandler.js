// CREATE A HANDLER TO RUN CRUD operations on the client

const Client = require('../models/Client');
const Question = require('../models/Question');

exports.createClient = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Fetch all available questions
    const questions = await Question.find();

    // Initialize `questionAnswers` based on available questions
    const questionAnswers = questions.map((question) => ({
      question_ID: question._id,
      answerGiven_index: null, // Default to no answer
    }));

    const newClient = new Client({ name, email, phone, questionAnswers });
    const savedClient = await newClient.save();

    res.status(201).json({
      message: 'Client created successfully',
      client: savedClient,
    });
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(500).json({ error: 'An error occurred while creating the client' });
  }
};

exports.getAllClients = async (req, res) => {
    try {
      const clients = await Client.find().populate('coach'); // Populate coach details
      res.status(200).json(clients);
    } catch (err) {
      console.error('Error fetching clients:', err);
      res.status(500).json({ error: 'An error occurred while fetching clients' });
    }
};
  
exports.getClientById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const client = await Client.findById(id).populate('coach');
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(200).json(client);
    } catch (err) {
      console.error('Error fetching client:', err);
      res.status(500).json({ error: 'An error occurred while fetching the client' });
    }
};
  
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
  
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true, runValidators: true }
      );
      if (!updatedClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(200).json({
        message: 'Client updated successfully',
        client: updatedClient,
      });
    } catch (err) {
      console.error('Error updating client:', err);
      res.status(500).json({ error: 'An error occurred while updating the client' });
    }
};
  
exports.updateClientAnswers = async (req, res) => {
    const { id } = req.params;
    const { question_ID, answerGiven_index } = req.body;
  
    try {
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Update the specific answer in `questionAnswers`
      const answerIndex = client.questionAnswers.findIndex(
        (qa) => qa.question_ID.toString() === question_ID
      );
  
      if (answerIndex === -1) {
        return res.status(400).json({ error: 'Question not found in client data' });
      }
  
      client.questionAnswers[answerIndex].answerGiven_index = answerGiven_index;
      await client.save();
  
      res.status(200).json({
        message: 'Client answers updated successfully',
        client,
      });
    } catch (err) {
      console.error('Error updating client answers:', err);
      res.status(500).json({ error: 'An error occurred while updating client answers' });
    }
};

exports.deleteClient = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClient = await Client.findByIdAndDelete(id);
      if (!deletedClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(200).json({
        message: 'Client deleted successfully',
        client: deletedClient,
      });
    } catch (err) {
      console.error('Error deleting client:', err);
      res.status(500).json({ error: 'An error occurred while deleting the client' });
    }
};
  
  