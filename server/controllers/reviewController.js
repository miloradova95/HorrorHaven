const reviewModel = require('../models/reviewModel');

const getReviewsByMovieId = async (req, res) => {
  const { movieId } = req.params;
  
  try {
    const reviews = await reviewModel.getReviewsByMovieId(movieId); // Fix the function name here
    if (reviews.length === 0) {
      // Return an empty array if no reviews are found instead of 404
      return res.status(200).json([]);
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};


async function addReview(req, res) {
    try {
      const { userId, movieId, rating, comment } = req.body;
      const newReview = await reviewModel.addReview(userId, movieId, rating, comment);
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Failed to add review' });
    }
  }
  
  async function deleteReview(req, res) {
    try {
      const reviewId = req.params.id;
      await reviewModel.deleteReview(reviewId);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }
  
  async function updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const { rating, comment } = req.body;
      const updatedReview = await reviewModel.updateReview(reviewId, rating, comment);
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Failed to update review' });
    }
  }

module.exports = {
    getReviewsByMovieId,
    addReview,
    deleteReview,
    updateReview
};
