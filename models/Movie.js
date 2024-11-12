const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [String], 
    director: String,
    cast: [String],
    releaseDate: Date,
    runtime: Number,     
    synopsis: String,
    averageRating: { type: Number, default: 0 },
    trivia: [String], 
    goofs: [String], 
    soundtrack: [String], 
    ageRating: String, 
    country: String,
    language: String,
    keywords: [String],
    popularity: { type: Number, default: 0 },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
