const db = require('../db');
const { v4 } = require('uuid');
const { Router } = require('express');
const requireBody = require('../middlewares/requireBody');

const router = Router();

const requireTestimonialBody = requireBody(['author', 'text']);

router.get('/', (req, res) => {
  res.send(db.testimonials);
});

router.get('/random', (req, res) => {
  res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.get('/:id', (req, res) => {
  const elem = db.testimonials.find((elem) => elem.id == req.params.id);
  elem ? res.send(elem) : res.status(400).json({ message: 'Not found...' });
});

router.post('/', requireTestimonialBody, (req, res) => {
  db.testimonials.push({
    id: v4(),
    ...req.body,
  });

  res.json({ message: 'OK' });
});

router.put('/:id', requireTestimonialBody, (req, res) => {
  let found;
  for (const elem of db.testimonials) {
    if (elem.id == req.params.id) {
      found = true;
      Object.assign(elem, req.body);
    }
  }
  found
    ? res.json({ message: 'OK' })
    : res.status(400).json({ message: 'Not found...' });
});

router.delete('/:id', (req, res) => {
  if (!db.testimonials.some((elem) => elem.id == req.params.id)) {
    return res.status(400).json({ message: 'Not found...' });
  }
  db.testimonials = db.testimonials.filter((elem) => elem.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
