const express = require('express');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();
const { addMovie, updateMovie, deleteMovie, getMovieDetails, getMovies } = require('../controllers/movieController');

// Movie Routes
router.post('/add', adminProtect, addMovie);
router.put('/update/:id', adminProtect, updateMovie);
router.delete('/delete/:id', adminProtect, deleteMovie);
router.get('/:id', getMovieDetails);
router.get('/', getMovies);

module.exports = router;
