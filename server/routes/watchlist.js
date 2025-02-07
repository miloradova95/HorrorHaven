const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { authenticateJWT } = require('../services/authentication');

router.post('/add', authenticateJWT, watchlistController.addToWatchlist);
router.delete('/remove', authenticateJWT, watchlistController.removeFromWatchlist);
router.get('/:userId', authenticateJWT, watchlistController.getWatchlistByUserId);

module.exports = router;
