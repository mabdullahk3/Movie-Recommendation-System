const express = require('express');
const { createBoxOffice, getBoxOffice, updateBoxOffice, deleteBoxOffice } = require('../controllers/boxOfficeController');

const router = express.Router();

// Box Office Routes
router.post('/', createBoxOffice);
router.get('/:movieId', getBoxOffice);
router.put('/:movieId', updateBoxOffice);
router.delete('/:movieId', deleteBoxOffice);

module.exports = router;
