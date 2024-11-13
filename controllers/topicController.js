const Topic = require('../models/Topic');
const DiscussionBoard = require('../models/DiscussionBoard');

// Create a new topic
const createTopic = async (req, res) => {
    try {
        const topic = new Topic(req.body);
        await topic.save();
        await DiscussionBoard.findByIdAndUpdate(req.body.board, { $push: { topics: topic._id } });

        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Error creating topic: ', error });
    }
};

// Get topics by board ID
const getTopicsByBoard = async (req, res) => {
    try {
        const topics = await Topic.find({ board: req.params.boardId });
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching topics for board: ', error });
    }
};

module.exports = { createTopic, getTopicsByBoard };