// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const settingsController = require('../src/Controllers/settingsController.js');


router.get('/settings/timings', settingsController.getSettings);
router.put('/settings/timings', settingsController.updateTimings);
router.post('/settings/maintenance', settingsController.addMaintenance);
router.get('/settings/maintenance', settingsController.getMaintenance);
// router.post('/settings/timings', settingsController.addTimings);

module.exports = router;
