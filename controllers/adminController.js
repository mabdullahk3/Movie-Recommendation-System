const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

// Function to manage movies
const manageMovies = async (req, res) => {
    const { movieId } = req.params;
    const { title, genre, description, director, cast, releaseDate, runtime, ageRating, country, language, keywords } = req.body;

    try {
        const movie = await Movie.findByIdAndUpdate(
            movieId,
            { title, genre, description, director, cast, releaseDate, runtime, ageRating, country, language, keywords },
            { new: true }
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found :(' });
        }
        res.status(200).json({ message: 'Movie updated.', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie.', error });
    }

};

// Function to moderate reviews
const moderateReviews = async (req, res) => {
    const { reviewId } = req.params;
    const { status, message } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        review.status = status;
        review.adminMessage = message;
        await review.save();

        res.status(200).json({ message: 'Review moderated.', review });
    } catch (error) {
        res.status(500).json({ message: 'Error moderating review.', error });
    }
};

// Function to get site statictics
const getSiteStatistics = async (req, res) => {
    try {
        const popularMovies = await Movie.find().sort({ popularity: -1 }).limit(5);
        const activeUsers = await User.countDocuments({ isActive: true });
        res.status(200).json({ popularMovies, activeUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics.', error });
    }
};

// Function to get trending insights
const getTrendingInsights = async (req, res) => {
    try {
        const trendingGenres = await Movie.aggregate([
            { $unwind: "$genre" },
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        const mostSearchedActors = await User.aggregate([
            { $unwind: "$searchHistory" },
            { $match: { "searchHistory.type": "actor" } },
            { $group: { _id: "$searchHistory.query", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({ trendingGenres, mostSearchedActors });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching insights', error });
    }
};

module.exports = {
    manageMovies,
    moderateReviews,
    getSiteStatistics,
    getTrendingInsights
};