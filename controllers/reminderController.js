const Reminder = require('../models/reminderModel');
const Movie = require('../models/Movie');
const User = require('../models/User');
const Notification = require('../models/notificationModel'); 

// Function to set reminder
const setReminder = async (req, res) => {
    const { userId, movieId, reminderDate } = req.body;
    console.log(movieId);
    console.log(userId);
    console.log(reminderDate);
    try {
        const movie = await Movie.findById(movieId);
        
        const user = await User.findById(userId);

        if (!movie ) {
            return res.status(404).json({ message: 'Movie not found :(' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found :(' });
        }

        const reminder = new Reminder({
            user: userId,
            movie: movieId,
            reminderDate: new Date(reminderDate),
        });

        await reminder.save();

        res.status(201).json(reminder);
    } catch (error) {
        res.status(500).json({ message: 'Error setting reminder', error });
    }
};

// Function to get all reminders for a user
const getUserReminders = async (req, res) => {
    const { userId } = req.params;
    try {
        const reminders = await Reminder.find({ user: userId })
            .sort({ reminderDate: 1 });  // Sort reminders by reminder date (ascending)
        
        if (!reminders || reminders.length === 0) {
            return res.status(404).json({ message: 'No reminders found for this user.' });
        }

        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reminders', error });
    }
};



module.exports = { setReminder, getUserReminders  };