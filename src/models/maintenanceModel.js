const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  start: String,
  end: String,
});

const maintenanceSchema = new mongoose.Schema({
  date: String,
  timeSlots: [timeSlotSchema],
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
