const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Adding a review
const addReview = async (req, res) => {
    const { movieId } = req.params;
    const { rating, comment } = req.body;
    
    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: 'Rating must be between 1 and 10.' });
    }

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found :(' });
        }

        // Check if the user already reviewed this movie
        const existingReview = await Review.findOne({ user: req.user._id, movie: movieId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this movie.' });
        }

        const review = new Review({
            user: req.user._id,
            movie: movieId,
            rating,
            comment
        });

        await review.save();

        // Update average rating for the movie
        const reviews = await Review.find({ movie: movieId });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        movie.averageRating = averageRating;
        await movie.save();

        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review.', error });
    }
};

// Updating review of a movie
const updateReview = async (req, res) => {
    const { reviewId, movieId } = req.params;
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: 'Rating must be between 1 and 10.' });
    }

    try {
        const review = await Review.findOne({ _id: reviewId, user: req.user._id, movie: movieId });
        if (!review) {
            return res.status(404).json({ message: 'You havent reviewed this movie yet.' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        // Recalculate average rating for the movie
        const reviews = await Review.find({ movie: movieId });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        await Movie.findByIdAndUpdate(movieId, { averageRating });

        res.status(200).json({ message: 'Review updated successfully.', review });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review.', error });
    }
};

// Getting reviews of a movie
const getMovieReviews = async (req, res) => {
    const { movieId } = req.params;

    try {
        const reviews = await Review.find({ movie: movieId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews.', error });
    }
};

// Getting review highlights
const getReviewHighlights = async (req, res) => {
    const { movieId } = req.params;

    try {
        const topReviews = await Review.find({ movie: movieId }).sort({ rating: -1 }).limit(3);
        const mostDiscussedReviews = await Review.find({ movie: movieId }).sort({ comment: -1 }).limit(3);

        res.status(200).json({
            topRated: topReviews,
            mostDiscussed: mostDiscussedReviews
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving review highlights.', error });
    }
};

module.exports = {
    addReview,
    updateReview,
    getMovieReviews,
    getReviewHighlights
};