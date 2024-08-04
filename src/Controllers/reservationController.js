const Reservation = require('../models/reservationModel');

exports.createReservation = async (req, res) => {
  try {
    const { date, timeSlots, firstName, lastName, email, phoneNumber } = req.body;
    
    // Create a new reservation with pending status
    const newReservation = new Reservation({
      date,
      timeSlots,
      user: {
        firstName,
        lastName,
        email,
        phoneNumber
      },
      status: 'pending'  // Set the status to 'pending'
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};


exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name email');
    if (reservations.length === 0) {
      return res.status(200).json({ message: 'No reservations found' });
    }
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};
