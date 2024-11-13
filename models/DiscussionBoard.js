const mongoose = require('mongoose');

const discussionBoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
}, { 
    timestamps: true 
});

module.exports = mongoose.model('DiscussionBoard', discussionBoardSchema);