const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const customListRoutes = require('./routes/customListRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/custom-lists', customListRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));