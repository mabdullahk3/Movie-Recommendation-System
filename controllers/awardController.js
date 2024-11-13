const Award = require('../models/Awards');

// Create award
const createAward = async (req, res) => {
    try {
        const award = new Award(req.body);
        await award.save();
        res.status(201).json(award);
    } catch (error) {
        res.status(500).json({ message: 'Error creating award record', error });
    }
};

// Get Awards by Movie ID
const getAwardsByMovie = async (req, res) => {
    try {
        const awards = await Award.find({ movie: req.params.movieId });
        res.status(200).json(awards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching awards', error });
    }
};

// Get Awards by Actor ID
const getAwardsByActor = async (req, res) => {
    const { actorName } = req.params;
    try {
        const awards = await Award.find({ actor: actorName });
        res.status(200).json(awards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching awards for actor.', error });
    }
};

// Update Award by Award ID
const updateAward = async (req, res) => {
    try {
        const award = await Award.findByIdAndUpdate(req.params.awardId, req.body, { new: true });
        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json(award);
    } catch (error) {
        res.status(500).json({ message: 'Error updating award', error });
    }
};

// Delete Award by Award ID
const deleteAward = async (req, res) => {
    try {
        const award = await Award.findByIdAndDelete(req.params.awardId);
        if (!award) return res.status(404).json({ message: 'Award not found' });
        res.status(200).json({ message: 'Award deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting award', error });
    }
};

module.exports = { createAward, getAwardsByMovie, getAwardsByActor, updateAward, deleteAward };