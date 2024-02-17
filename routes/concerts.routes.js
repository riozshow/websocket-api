const express = require('express');
const router = express.Router();
const Concert = require('../models/concert.model');
const controllers = require('../controllers/concert.controller');
const createDefaultEndpoints = require('../utils/createDefaultEndpoints');

createDefaultEndpoints(router, Concert, controllers);

module.exports = router;
