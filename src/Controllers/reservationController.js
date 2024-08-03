const Reservation = require('../models/reservationModel.js');

exports.createReservation = async (req, res) => {
  try {
    const { date, timeSlots, userId } = req.body;
    const newReservation = new Reservation({ date, timeSlots, user: userId });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name email');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};
