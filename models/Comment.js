const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema);