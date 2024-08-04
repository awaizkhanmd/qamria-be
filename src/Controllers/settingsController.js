const Settings = require('../models/settingsModel');
const Maintenance = require('../models/maintenanceModel');
const Reservation = require('../models/reservationModel');


// Get current settings (including operational timings)
exports.getSettings = async (req, res) => {
    try {
      const settings = await Settings.findOne();
      if (!settings) {
        return res.status(404).json({ message: 'No settings found.' });
      }
  
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching settings', error });
    }
  };
  
  // Update operational timings
  exports.updateTimings = async (req, res) => {
    try {
      const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
  
      // Log the incoming request body
      console.log('Incoming updateTimings request:', req.body);
  
      // Validate time slots for each day
      const validMonday = monday.every(isValidTimeSlot);
      const validTuesday = tuesday.every(isValidTimeSlot);
      const validWednesday = wednesday.every(isValidTimeSlot);
      const validThursday = thursday.every(isValidTimeSlot);
      const validFriday = friday.every(isValidTimeSlot);
      const validSaturday = saturday.every(isValidTimeSlot);
      const validSunday = sunday.every(isValidTimeSlot);
  
      if (!validMonday || !validTuesday || !validWednesday || !validThursday || !validFriday || !validSaturday || !validSunday) {
        return res.status(400).json({ message: 'Invalid time format. Time should be in "hh:mm AM/PM" format.' });
      }
  
      let settings = await Settings.findOne();
  
      if (!settings) {
        settings = new Settings();
      }
  
      settings.monday = monday;
      settings.tuesday = tuesday;
      settings.wednesday = wednesday;
      settings.thursday = thursday;
      settings.friday = friday;
      settings.saturday = saturday;
      settings.sunday = sunday;
  
      const updatedSettings = await settings.save();
  
      // Log the saved settings
    //   console.log('Updated settings:', updatedSettings);
  
      res.status(200).json({ message: 'Settings updated successfully', settings: updatedSettings });
    } catch (error) {
      res.status(500).json({ message: 'Error updating settings', error });
    }
  };

// Add maintenance period and update reservation status
exports.addMaintenance = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    // Validate date and time slots
    if (!date || !moment(date, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ message: 'Invalid date format. Date should be in "YYYY-MM-DD" format.' });
    }

    const validTimeSlots = timeSlots.every(slot => isValidTimeSlot(slot));
    if (!validTimeSlots) {
      return res.status(400).json({ message: 'Invalid time slot format. Time should be in "hh:mm AM/PM" format.' });
    }

    // Add maintenance period
    const maintenance = new Maintenance({ date, timeSlots });
    await maintenance.save();

    // Update overlapping reservations to "maintenance" status
    for (const slot of timeSlots) {
      await Reservation.updateMany(
        { date, timeSlots: { $elemMatch: { start: slot.start, end: slot.end } } },
        { $set: { status: 'maintenance' } }
      );
    }

    res.status(201).json({ message: 'Maintenance period added and reservations updated', maintenance });
  } catch (error) {
    res.status(500).json({ message: 'Error adding maintenance period', error });
  }
};

// Get all maintenance periods
exports.getMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find();
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance periods', error });
  }
};

// Helper function to validate time format (hh:mm AM/PM)
const isValidTime = (time) => /^(0?[1-9]|1[0-2]):[0-5][0-9] ?[APap][mM]$/.test(time);

// Helper function to validate time slot format
const isValidTimeSlot = (slot) => isValidTime(slot.start) && isValidTime(slot.end);