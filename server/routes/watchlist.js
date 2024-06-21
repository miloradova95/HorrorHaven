const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { authenticateJWT } = require('../services/authentication');


router.get('/', authenticateJWT, watchlistController.getUserWatchlist);
router.post('/add', authenticateJWT, watchlistController.addMovieToWatchlist);
router.delete('/remove', authenticateJWT, watchlistController.removeMovieFromWatchlist);

module.exports = router;