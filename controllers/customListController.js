const CustomList = require('../models/CustomList');
const Movie = require('../models/Movie');

// Custom List Creation
const createCustomList = async (req, res) => {
    const { title, description, movies } = req.body;
    try{
        const customList = new CustomList({
            user: req.user._id,
            title,
            description,
            movies,
        });
        await customList.save();
        res.status(201).json({ message: 'Custom list created successfully.', customList });
    } catch(error){
        res.status(500).json({ message: 'Error creating custom list.', error });
    }
};

// Get all custom lists
const getAllCustomLists = async (req, res) => {
    try {
        const customLists = await CustomList.find().populate('user', 'name');
        res.status(200).json(customLists);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving custom lists', error });
    }
};

// Get a specific custom list
const getCustomList = async (req, res) => {
    const { listId } = req.params;
    try {
        const customList = await CustomList.findById(listId).populate('user', 'name').populate('movies');
        if (!customList) {
            return res.status(404).json({ message: 'Custom list not found.' });
        }
        res.status(200).json(customList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving custom list.', error });
    }

};

// Follow a custom list
const followCustomList = async (req, res) => {
    const { listId } = req.params;
    try {
        const customList = await CustomList.findById(listId);
        if (!customList) {
            return res.status(404).json({ message: 'Custom list not found.' });
        }

        if (customList.followers.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are already following this list :)' });
        }

        customList.followers.push(req.user._id);
        await customList.save();
        res.status(200).json({ message: 'Successfully followed the list.', customList });
    } catch (error) {
        res.status(500).json({ message: 'Error following the custom list.', error });
    }
};

// Unfollow a custom list
const unfollowCustomList = async (req, res) => {
    const { listId } = req.params;
    try {
        const customList = await CustomList.findById(listId);
        if (!customList) {
            return res.status(404).json({ message: 'Custom list not found.' });
        }

        const index = customList.followers.indexOf(req.user._id);
        if (index === -1) {
            return res.status(400).json({ message: 'You are not following this list :(' });
        }

        customList.followers.splice(index, 1);
        await customList.save();
        res.status(200).json({ message: 'Successfully unfollowed the list.', customList });
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing the custom list.', error });
    }
};

module.exports = {
    createCustomList,
    getAllCustomLists,
    getCustomList,
    followCustomList,
    unfollowCustomList
};