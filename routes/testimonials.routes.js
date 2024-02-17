const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial.model');
const controllers = require('../controllers/testimonial.controller');
const createDefaultEndpoints = require('../utils/createDefaultEndpoints');

createDefaultEndpoints(router, Testimonial, controllers);

module.exports = router;
