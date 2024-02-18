const express = require('express');
const router = express.Router();
const Concert = require('../models/concert.model');
const controllers = require('../controllers/concert.controller');
const createDefaultEndpoints = require('../utils/createDefaultEndpoints');

createDefaultEndpoints(router, Concert, controllers);

router.get(`/concerts/performer/:performer`, (req, res) => {
  Concert.find({ performer: req.params.performer })
    .then((data) =>
      data && data.length
        ? res.json(data)
        : res.status(404).json({ message: 'Not found' })
    )
    .catch((err) => res.status(500).json({ message: err._message }));
});

router.get(`/concerts/genre/:genre`, (req, res) => {
  Concert.find({ genre: req.params.genre })
    .then((data) =>
      data && data.length
        ? res.json(data)
        : res.status(404).json({ message: 'Not found' })
    )
    .catch((err) => res.status(500).json({ message: err._message }));
});

router.get(`/concerts/price/day/:day`, (req, res) => {
  Concert.find({ day: parseInt(req.params.day) })
    .then((data) =>
      data && data.length
        ? res.json(data)
        : res.status(404).json({ message: 'Not found' })
    )
    .catch((err) => res.status(500).json({ message: err._message }));
});

router.get(`/concerts/price/:price_min/:price_max`, (req, res) => {
  Concert.find({
    $and: [
      { price: { $gt: req.params.price_min } },
      { price: { $lt: req.params.price_max } },
    ],
  })
    .then((data) =>
      data && data.length
        ? res.json(data)
        : res.status(404).json({ message: 'Not found' })
    )
    .catch((err) => res.status(500).json({ message: err._message }));
});

module.exports = router;
