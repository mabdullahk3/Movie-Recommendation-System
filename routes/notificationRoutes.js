const express = require('express');
const router = express.Router();
const { notifyUserForUpcomingMovies } = require('../controllers/notificationController');

// Route to send notifications for a user based on their preferences and upcoming movies
router.get('/notifications/upcoming/:userId', notifyUserForUpcomingMovies);

module.exports = router;


