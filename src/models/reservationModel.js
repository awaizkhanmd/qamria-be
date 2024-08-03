const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlots: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Reservation', reservationSchema);
