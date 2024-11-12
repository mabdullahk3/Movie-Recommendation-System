const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
