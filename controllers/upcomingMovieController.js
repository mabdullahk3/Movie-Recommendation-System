const UpcomingMovie = require('../models/UpcomingMovie');

// Add a new UpcomingMovie
const addUpcomingMovie = async (req, res) => {
    const { title, releaseDate, director , cast, summary , genre , countryOfOrigin} = req.body;
    try{
        const newUpcomingMovie = new UpcomingMovie({
            title,
            releaseDate,
            director,
            cast,
            summary,
            genre,
            countryOfOrigin,
        });
        await newUpcomingMovie.save();
        return res.status(201).json({
            message: 'Upcoming movie added successfully',
            newUpcomingMovie
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            message: 'Error adding upcoming movie',
            error
        });
    }    
};

// Fetch all upcoming movies sorted by release date
const getUpcomingMovies = async (req, res) => {
    try {
        const upcomingMovies = await UpcomingMovie.find().sort({ releaseDate: 1 }); 
        return res.status(200).json(upcomingMovies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching upcoming movies',
            error
        });
    }
};

// Fetch upcoming movies based on a specific time range
const getUpcomingMoviesByRange = async (req, res) => {
    const { days } = req.params;
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    try {
        const upcomingMovies = await UpcomingMovie.find({
            releaseDate: { $gte: now, $lte: futureDate },
        }).sort({ releaseDate: 1 }); // Sort by release date (ascending)
        return res.status(200).json(upcomingMovies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching upcoming movies by date range',
            error
        });
    }
};

module.exports = {
    addUpcomingMovie,
    getUpcomingMovies,
    getUpcomingMoviesByRange,
};