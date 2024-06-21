const pool = require('../services/database').config;

// Add a movie to the watchlist
async function addMovieToWatchlist(userId, movieId) {
    try {
        await pool.execute('INSERT INTO watchlists (user_id, movie_id) VALUES (?, ?)', [userId, movieId]);
    } catch (error) {
        throw new Error('Error adding movie to watchlist');
    }
}

// Get user's watchlist
async function getUserWatchlist(userId) {
    try {
        const [rows] = await pool.execute('SELECT * FROM watchlists WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        throw new Error('Error fetching watchlist');
    }
}

// Remove a movie from the watchlist
async function removeMovieFromWatchlist(userId, movieId) {
    try {
        await pool.execute('DELETE FROM watchlists WHERE user_id = ? AND movie_id = ?', [userId, movieId]);
    } catch (error) {
        throw new Error('Error removing movie from watchlist');
    }
}

module.exports = {
    addMovieToWatchlist,
    getUserWatchlist,
    removeMovieFromWatchlist
};
