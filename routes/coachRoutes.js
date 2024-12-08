const express = require('express');
const { createCoach, getCoaches } = require('../controllers/coachController');

const router = express.Router();

router.post('/', createCoach);
router.get('/', getCoaches);

module.exports = router;
