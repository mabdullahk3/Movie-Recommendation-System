const express = require('express');
const router = express.Router();
const { setReminder , getUserReminders } = require('../controllers/reminderController');

// Route for setting reminder
router.post('/reminders', setReminder);
router.get('/reminders/:userId', getUserReminders);

module.exports = router;