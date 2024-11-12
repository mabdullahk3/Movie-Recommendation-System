const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCustomList, getAllCustomLists, getCustomList, followCustomList, unfollowCustomList } = require('../controllers/customListController');

const router = express.Router();

// Custom List Routes
router.post('/', protect, createCustomList); 
router.get('/', getAllCustomLists); 
router.get('/:listId', getCustomList); 
router.post('/:listId/follow', protect, followCustomList); 
router.post('/:listId/unfollow', protect, unfollowCustomList); 

module.exports = router;