const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true }
});

const dailySettingsSchema = new mongoose.Schema({
  monday: [timeSlotSchema],
  tuesday: [timeSlotSchema],
  wednesday: [timeSlotSchema],
  thursday: [timeSlotSchema],
  friday: [timeSlotSchema],
  saturday: [timeSlotSchema],
  sunday: [timeSlotSchema]
});

module.exports = mongoose.model('Settings', dailySettingsSchema);
