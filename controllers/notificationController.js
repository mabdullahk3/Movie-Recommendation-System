const User = require('../models/User'); 
const Notification = require('../models/notificationModel');
const UpcomingMovie = require('../models/UpcomingMovie'); 

// Function for sending notifications based on user preferences
const sendUpcomingMovieNotifications = async (userId) => {
    try {
        const user = await User.findById(userId);
        const { preferences } = user;

        // Fetch upcoming movies that match user preferences
        const upcomingMovies = await UpcomingMovie.find({
            genre: { $in: preferences }, 
            releaseDate: { $gte: new Date() }, 
        });

        upcomingMovies.forEach(async (movie) => {
            const notificationMessage = `The movie "${movie.title}" is releasing soon on ${movie.releaseDate.toDateString()}. Genre: ${movie.genre.join(', ')}`;

            // Create a new notification for the user
            const notification = new Notification({
                user: user._id,
                message: notificationMessage,
                status: 'unread',
            });

            await notification.save();
            console.log(`Notification sent for movie: ${movie.title}`);
        });

        return { message: 'Notifications sent for upcoming movies.' };
    } catch (error) {
        console.error('Error sending notifications:', error);
        throw new Error('Failed to send notifications.');
    }
};

// Route to send notifications for a user
const notifyUserForUpcomingMovies = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await sendUpcomingMovieNotifications(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendUpcomingMovieNotifications,
    notifyUserForUpcomingMovies,
};
