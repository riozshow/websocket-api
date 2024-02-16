const db = require('../db');
const { v4 } = require('uuid');
const { Router } = require('express');
const requireBody = require('../middlewares/requireBody');

const router = Router();

const requireConcertBody = requireBody([
  'performer',
  'genre',
  'price',
  'day',
  'image',
]);

router.get('/', (req, res) => {
  res.send(db.concerts);
});

router.get('/random', (req, res) => {
  res.send(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.get('/:id', (req, res) => {
  const elem = db.concerts.find((elem) => elem.id == req.params.id);
  elem ? res.send(elem) : res.status(400).json({ message: 'Not found...' });
});

router.post('/', requireConcertBody, (req, res) => {
  db.concerts.push({
    id: v4(),
    ...req.body,
  });

  res.json({ message: 'OK' });
});

router.put('/:id', requireConcertBody, (req, res) => {
  let found;
  for (const elem of db.concerts) {
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
  if (!db.concerts.some((elem) => elem.id == req.params.id)) {
    return res.status(400).json({ message: 'Not found...' });
  }
  db.concerts = db.concerts.filter((elem) => elem.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
