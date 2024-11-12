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
}, {
    timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
