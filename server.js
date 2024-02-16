const express = require('express');
const cors = require('cors');
const path = require('path');

const testimonialsApi = require('./routes/testimonialsAPI');
const concertsApi = require('./routes/concertsAPI');
const seatsApi = require('./routes/seatsAPI');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const api = express.Router();
app.use('/api', api);

api.use('/testimonials', testimonialsApi);
api.use('/concerts', concertsApi);
api.use('/seats', seatsApi);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
