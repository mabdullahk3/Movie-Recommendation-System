const express = require('express');
const { createAward, getAwardsByMovie, getAwardsByActor, updateAward, deleteAward } = require('../controllers/awardController');

const router = express.Router();

// Award routes
router.post('/', createAward);
router.get('/movie/:movieId', getAwardsByMovie);
router.get('/actor/:actorName', getAwardsByActor);
router.put('/:awardId', updateAward);
router.delete('/:awardId', deleteAward);

module.exports = router;