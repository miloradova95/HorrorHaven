const watchlistModel = require('../models/watchlistModel');


async function addToWatchlist(req, res) {
    const { userId, movieId } = req.body;
    try {
        await watchlistModel.addToWatchlist(userId, movieId);
        res.sendStatus(201);
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        res.status(500).json({ error: 'Failed to add movie to watchlist' });
    }
}


async function removeFromWatchlist(req, res) {
    const { userId, movieId } = req.body;
    try {
        await watchlistModel.removeFromWatchlist(userId, movieId);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error removing movie from watchlist:', error);
        res.status(500).json({ error: 'Failed to remove movie from watchlist' });
    }
}


async function getWatchlistByUserId(req, res) {
    const userId = req.params.userId;
    try {
        const watchlist = await watchlistModel.getWatchlistByUserId(userId);
        res.json(watchlist);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
}

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlistByUserId,
};
