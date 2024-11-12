const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ['Movies', 'Actors', 'Upcoming Projects', 'Industry Updates'] },
    datePublished: { type: Date, default: Date.now },
    author: { type: String, required: true },
    source: { type: String },
}, {
    timestamps: true, 
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);