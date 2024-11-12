const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    title: { type: String, required: true }, 
    description: { type: String }, 
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], 
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
}, {
    timestamps: true
});

module.exports = mongoose.model('CustomList', customListSchema);