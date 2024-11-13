const Comment = require('../models/Comment');
const Topic = require('../models/Topic');

// Add a comment to a topic
const addComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        await Topic.findByIdAndUpdate(req.body.topic, { $push: { comments: comment._id } });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// Get comments by topic ID
const getCommentsByTopic = async (req, res) => {
    try {
        const comments = await Comment.find({ topic: req.params.topicId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments for topic: ', error });
    }
};

module.exports = { addComment, getCommentsByTopic };