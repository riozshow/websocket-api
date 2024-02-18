const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Seat = require('./models/seat.model');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

dotenv.config();

mongoose.connect(
  process.env.NODE_ENV !== 'test'
    ? process.env.DB_URI
    : 'mongodb://0.0.0.0:27017/NewWaveDBtest'
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

const server = app.listen(process.env.PORT || 8000, async () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('login', async () => {
    socket.emit('updateSeats', await Seat.find());
  });
});

const api = express.Router();

api.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = server;
