const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Testimonial',
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Concert', concertSchema);
