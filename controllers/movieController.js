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
        const { genre, director, cast, rating, popularity, year, decade, country, language, keywords, topByGenre } = req.query;
        let query = {};
        
        // Basic Search Filter
        if (genre) query.genre = genre;
        if (director) query.director = { $regex: director, $options: 'i' };
        if (cast) query.cast = { $in: [cast] };
        
        // Rating Filter
        if (rating) query.averageRating = { $gte: rating };

        // Popularity Filter
        if (popularity) query.popularity = { $gte: popularity };

        // Year Filter
        if (year) query.releaseDate = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) };

        // Decade Filter
        if (decade) {
            const startYear = (Math.floor(decade / 10) * 10);
            const endYear = startYear + 9;
            query.releaseDate = { $gte: new Date(`${startYear}-01-01`), $lt: new Date(`${endYear}-12-31`) };
        }

        // Filter by Country, Language, Keywords
        if (country) query.country = country;
        if (language) query.language = language;
        if (keywords) query.keywords = { $in: [keywords] };

        // Top 10 Movies of each genre
        if (topByGenre) {
            console.log(topByGenre);
            const topMovies = await Movie.aggregate([
                { $match: { genre: { $regex: topByGenre, $options: "i" } } },
                { $sort: { averageRating: -1 } },  
                { $limit: 10 }
            ]);
            return res.status(200).json(topMovies);
        }

        // Filter movies by release date
        const movies = await Movie.find(query).sort({ releaseDate: -1 });
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
