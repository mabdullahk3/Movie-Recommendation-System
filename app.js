const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const customListRoutes = require('./routes/customListRoutes');
const upcomingMovieRoutes = require('./routes/upcomingMovieRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const newsArticleRoutes = require('./routes/newsArticleRoutes');
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
app.use('/api/upcomingMovies', upcomingMovieRoutes);
app.use('/api', reminderRoutes);
app.use('/api', notificationRoutes);
app.use('/api/news-articles', newsArticleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
