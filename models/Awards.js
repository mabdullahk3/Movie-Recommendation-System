const mongoose = require('mongoose');

const awardsSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, 
    actor: { type: String }, 
    name: { type: String, required: true },                        
    category: { type: String, required: true },                    
    year: { type: Number, required: true },                        
    won: { type: Boolean, default: false }                        
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Award', awardsSchema);
