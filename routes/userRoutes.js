const express = require('express');
const { registerUser, loginUser, updateUserProfile, getUserProfile, addToWishlist, removeFromWishlist , createAdmin } = require('../controllers/userController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.put('/wishlist/add', protect, addToWishlist);
router.put('/wishlist/remove', protect, removeFromWishlist);

// only accessible by existing admin
router.post('/create-admin', adminProtect, createAdmin);

module.exports = router;