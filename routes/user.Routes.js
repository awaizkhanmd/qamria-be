const express = require('express');
const router = express.Router();
const userController = require('../src/Controllers/userController.js');

// Define routes for users
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);

module.exports = router;
