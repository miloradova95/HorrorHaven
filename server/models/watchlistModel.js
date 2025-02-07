const db = require('../services/database').config;


async function addToWatchlist(userId, movieId) {
    try {
        const query = 'INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)';
        await db.execute(query, [userId, movieId]);
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        throw new Error('Error adding movie to watchlist');
    }
}


async function removeFromWatchlist(userId, movieId) {
    try {
        const query = 'DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?';
        await db.execute(query, [userId, movieId]);
    } catch (error) {
        console.error('Error removing movie from watchlist:', error);
        throw new Error('Error removing movie from watchlist');
    }
}


async function getWatchlistByUserId(userId) {
    try {
        const query = 'SELECT * FROM watchlist WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    } catch (error) {
        console.error('Database error fetching watchlist:', error);
        throw new Error('Error fetching watchlist');
    }
}

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlistByUserId,
};
