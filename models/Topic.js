const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionBoard', required: true },
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Topic', topicSchema);