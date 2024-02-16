const db = require('../db');
const { v4 } = require('uuid');
const { Router } = require('express');
const requireBody = require('../middlewares/requireBody');

const router = Router();

const requireSeatsBody = requireBody(['day', 'seat', 'client', 'email']);

router.get('/', (req, res) => {
  res.send(db.seats);
});

router.get('/random', (req, res) => {
  res.send(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.get('/:id', (req, res) => {
  const elem = db.seats.find((elem) => elem.id == req.params.id);
  elem ? res.send(elem) : res.status(400).json({ message: 'Not found...' });
});

router.post('/', requireSeatsBody, (req, res) => {
  if (
    db.seats.some(
      ({ seat, day }) => seat == req.body.seat && day == req.body.day
    )
  ) {
    return res.status(400).json({ message: 'The slot is already taken...' });
  }

  db.seats.push({
    id: v4(),
    ...req.body,
  });

  res.json({ message: 'OK' });
});

router.put('/:id', requireSeatsBody, (req, res) => {
  let found;
  for (const elem of db.seats) {
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
  if (!db.seats.some((elem) => elem.id == req.params.id)) {
    return res.status(400).json({ message: 'Not found...' });
  }
  db.seats = db.seats.filter((elem) => elem.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
