const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    reminderDate: { type: Date, required: true },  
    status: { type: String, enum: ['pending', 'sent'], default: 'pending' },  
}, {
    timestamps: true,
});

module.exports = mongoose.model('Reminder', reminderSchema);
