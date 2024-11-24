const Coach = require('../models/Coach');
const { calculateMatchScore } = require('../utils/algorithm');

exports.matchCoaches = async (req, res) => {
    try {
        const userInput = req.body;
        const coaches = await Coach.find();

        // Calculate scores and sort
        const matchedCoaches = coaches.map(coach => ({
            coach,
            score: calculateMatchScore(userInput, coach),
        })).sort((a, b) => b.score - a.score);

        // Return top 5
        res.json(matchedCoaches.slice(0, 5).map(item => item.coach));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
