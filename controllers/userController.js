const User = require('../models/User');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User Route
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login User Route
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
};

// Get User Profile Route
const getUserProfile = async (req, res) => {
    res.json(req.user);
};

// Update User Profile Route
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.preferences = req.body.preferences || user.preferences;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

// Add movie to movie to watch list
const addToWishlist = async (req, res) => {
    try {
        const movieId = req.body.movieId;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const user = await User.findById(req.user._id);
        if (user.wishlist.includes(movieId)) return res.status(400).json({ message: 'Movie already in wishlist' });

        user.wishlist.push(movieId);
        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist' });
    }
};

// Remove movie from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const movieId = req.body.movieId;
        const user = await User.findById(req.user._id);
        if (!user.wishlist.includes(movieId)) return res.status(400).json({ message: 'Movie not in wishlist' });

        user.wishlist = user.wishlist.filter(id => id.toString() !== movieId);
        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist' });
    }
};

// Create admin
const createAdmin = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Admin already exists' });
        const user = await User.create({ name, email, password , isAdmin: true });
        user.isAdmin = true;
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin user', error });
    }
};

const setUserPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.preferences = req.body.preferences || user.preferences;

        const updatedUser = await user.save();
        res.json({
            message: 'Preferences updated successfully',
            preferences: updatedUser.preferences
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating preferences' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    addToWishlist,
    removeFromWishlist,
    createAdmin,
    setUserPreferences
};