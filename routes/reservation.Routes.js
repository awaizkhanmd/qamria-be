const express = require('express');
const { createReservation, getReservations } = require('../src/Controllers/reservationController.js');

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);

module.exports = router;
