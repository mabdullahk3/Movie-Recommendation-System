const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware for checking whether a user has access to JWT tokens
const protect = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                  ? req.headers.authorization.split(' ')[1] 
                  : null;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
};

// admin-specific protection middleware
const adminProtect = async (req, res, next) => {
    await protect(req, res, async () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    });
};

module.exports = { protect, adminProtect };
