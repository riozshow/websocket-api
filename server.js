const express = require('express');
const cors = require('cors');

const testimonialsApi = require('./routes/testimonialsAPI');
const concertsApi = require('./routes/concertsAPI');
const seatsApi = require('./routes/seatsAPI');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/testimonials', testimonialsApi);
app.use('/concerts', concertsApi);
app.use('/seats', seatsApi);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
