const express = require('express');
const { manageMovies, moderateReviews, getSiteStatistics, getTrendingInsights} = require('../controllers/adminController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin routes
router.put('/movies/:movieId', adminProtect, manageMovies);      
router.put('/reviews/:reviewId', adminProtect, moderateReviews);  
router.get('/statistics', adminProtect, getSiteStatistics);      
router.get('/insights', adminProtect, getTrendingInsights);       

module.exports = router;