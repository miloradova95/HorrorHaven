const watchlistModel = require('../models/watchlistModel');
const { getUserIdFromToken } = require('../services/authentication');

// Add a movie to the watchlist
exports.addMovieToWatchlist = async (req, res) => {
    const userId = getUserIdFromToken(req); // Fetch user ID from token
    const { movieId } = req.body;
    try {
        await watchlistModel.addMovieToWatchlist(userId, movieId);
        res.status(201).json({ message: 'Movie added to watchlist' });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        res.status(500).json({ message: 'Error adding movie to watchlist' });
    }
};

// Get user's watchlist
exports.getUserWatchlist = async (req, res) => {
    const userId = getUserIdFromToken(req); // Fetch user ID from token
    try {
        const watchlist = await watchlistModel.getUserWatchlist(userId);
        res.status(200).json(watchlist);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ message: 'Error fetching watchlist' });
    }
};

// Remove a movie from the watchlist
exports.removeMovieFromWatchlist = async (req, res) => {
    const userId = getUserIdFromToken(req); // Fetch user ID from token
    const { movieId } = req.body;
    try {
        await watchlistModel.removeMovieFromWatchlist(userId, movieId);
        res.status(200).json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        console.error('Error removing movie from watchlist:', error);
        res.status(500).json({ message: 'Error removing movie from watchlist' });
    }
};
