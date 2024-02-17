const Concert = require('../models/concert.model');

exports.getAll = (req, res) => {
  Concert.find()
    .then((data) =>
      Promise.all(
        data.map(async (concert) => await concert.populate('performer'))
      )
    )
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: err._message }));
};

exports.get = (req, res) => {
  Concert.findById(req.params.id)
    .then(async (data) =>
      data
        ? res.json(await data.populate('performer'))
        : res.status(404).json({ message: 'Not found' })
    )
    .catch((err) => res.status(500).json({ message: err._message }));
};

exports.getRandom = (req, res) => {
  Concert.aggregate([{ $sample: { size: 1 } }])
    .then(async ([data]) =>
      data
        ? Concert.findById(data._id)
        : res.status(404).json({ message: 'Not found' })
    )
    .then(async (data) => res.json(await data.populate('performer')))
    .catch((err) => res.status(500).json({ message: err._message }));
};
