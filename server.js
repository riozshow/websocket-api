const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const db = require('./db');

const testimonialsApi = require('./routes/testimonialsAPI');
const concertsApi = require('./routes/concertsAPI');
const seatsApi = require('./routes/seatsAPI');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('login', () => {
    socket.emit('updateSeats', db.seats);
  });
});

const api = express.Router();

api.use((req, res, next) => {
  req.io = io;
  next();
});

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
