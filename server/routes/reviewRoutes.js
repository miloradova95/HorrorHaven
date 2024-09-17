const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateJWT } = require('../services/authentication');


router.get('/:movieId', reviewController.getReviewsByMovieId);

router.post('/add', authenticateJWT, reviewController.addReview);

router.delete('/delete/:id', authenticateJWT, reviewController.deleteReview);

router.put('/edit/:id', authenticateJWT, reviewController.updateReview);

module.exports = router;
