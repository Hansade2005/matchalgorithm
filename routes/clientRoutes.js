const express = require('express');
const { createClient, getClients, matchClientToCoach } = require('../controllers/clientController');

const router = express.Router();

router.post('/', createClient);
router.get('/', getClients);
router.post('/:clientId/match', matchClientToCoach);

module.exports = router;
