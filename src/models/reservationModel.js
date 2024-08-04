const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlots: [{ type: String, required: true }],
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  status: { type: String, default: 'pending' },  // Default status to 'pending'
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
