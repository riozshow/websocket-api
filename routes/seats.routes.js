const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model');
const controllers = require('../controllers/seat.controller');
const createDefaultEndpoints = require('../utils/createDefaultEndpoints');

createDefaultEndpoints(router, Seat, controllers);

module.exports = router;
