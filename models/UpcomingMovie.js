const mongoose = require('mongoose');

const upcomingMovieSchema = new mongoose.Schema({
    title: { type: String, required: true },  
    releaseDate: { type: Date, required: true },
    director : [String], 
    cast: [String],  
    summary: { type: String }, 
    genre: [String],
    countryOfOrigin: { type: String },
}, {
    timestamps: true,  
});

module.exports = mongoose.model('UpcomingMovie', upcomingMovieSchema);