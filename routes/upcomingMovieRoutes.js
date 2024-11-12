const express = require('express');
const router = express.Router();
const { addUpcomingMovie,getUpcomingMovies,getUpcomingMoviesByRange} = require('../controllers/upcomingMovieController');

// Routes for adding and fetching upcoming movies
router.post('/upcoming', addUpcomingMovie);
router.get('/upcoming', getUpcomingMovies);
router.get('/upcoming/:days', getUpcomingMoviesByRange);

module.exports = router;