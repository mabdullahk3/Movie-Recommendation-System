const Movie = require('../models/Movie');

// Admin Only Functions
// adding a new movie
const addMovie = async (req, res) => {
    try {
        const { title, genre, director, cast, releaseDate, runtime, synopsis, averageRating, trivia, goofs, soundtrack, ageRating } = req.body;
        
        const movie = new Movie({
            title,
            genre,
            director,
            cast,
            releaseDate,
            runtime,
            synopsis,
            averageRating,
            trivia,
            goofs,
            soundtrack,
            ageRating
        });

        await movie.save();
        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie', error });
    }
};

// Update an existing movie 

const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

// Delete a movie 
const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};

// User Functions
// Get movie details by ID
const getMovieDetails = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie details', error });
    }
};

// Get all movies with optional filtering
const getMovies = async (req, res) => {
    try {
        const { genre, director, cast } = req.query;
        let query = {};

        if (genre) query.genre = genre;
        if (director) query.director = director;
        if (cast) query.cast = { $in: [cast] };

        const movies = await Movie.find(query);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
};

module.exports = {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieDetails,
    getMovies
};
