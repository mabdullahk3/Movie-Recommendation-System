const BoxOffice = require('../models/BoxOffice');

// Create a new BoxOffice record
const createBoxOffice = async (req, res) => {
    try {
        const boxOffice = new BoxOffice(req.body);
        await boxOffice.save();
        res.status(201).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: 'Error creating box office record :(', error });
    }
};

// Get BoxOffice records by Movie Id
const getBoxOffice = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findOne({ movie: req.params.movieId });
        if (!boxOffice) return res.status(404).json({ message: 'Box office record not found :(' });
        res.status(200).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching box office record.', error });
    }
};

// Update BoxOffice records by Movie Id
const updateBoxOffice = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findOneAndUpdate({ movie: req.params.movieId }, req.body, { new: true });
        if (!boxOffice) return res.status(404).json({ message: 'Box office record not found :(' });
        res.status(200).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: 'Error updating box office record.', error });
    }
};

// Delete BoxOffice records by Movie Id
const deleteBoxOffice = async (req, res) => {
    try {
        const boxOffice = await BoxOffice.findOneAndDelete({ movie: req.params.movieId });
        if (!boxOffice) return res.status(404).json({ message: 'Box office record not found' });
        res.status(200).json({ message: 'Box office record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting box office record', error });
    }
};

module.exports = { createBoxOffice, getBoxOffice, updateBoxOffice, deleteBoxOffice };