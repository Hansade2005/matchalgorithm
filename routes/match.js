const express = require('express');
const { matchCoaches } = require('../controllers/matchController');
const router = express.Router();

router.post('/', matchCoaches);

module.exports = router;
