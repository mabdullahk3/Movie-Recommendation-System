const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addReview, updateReview, getMovieReviews, getReviewHighlights } = require('../controllers/reviewController');

const router = express.Router();

router.post('/:movieId', protect, addReview);  
router.put('/:movieId/:reviewId', protect, updateReview);  
router.get('/:movieId', getMovieReviews);  
router.get('/:movieId/highlights', getReviewHighlights);  

module.exports = router;