const db = require('../services/database').config;

async function getReviewsByMovieId(movieId) {
    try {
        const [reviews] = await db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId]);
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}


async function addReview(userId, movieId, rating, comment) {
    const [result] = await db.execute('INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES (?, ?, ?, ?)', [
      userId, movieId, rating, comment
    ]);
    return result;
  }
  

  async function deleteReview(reviewId) {
    const [result] = await db.execute('DELETE FROM reviews WHERE id = ?', [reviewId]);
    return result;
  }
  

  async function updateReview(reviewId, rating, comment) {
    const [result] = await db.execute('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?', [
      rating, comment, reviewId
    ]);
    return result;
  }

module.exports = {
    getReviewsByMovieId,
    addReview,
    deleteReview,
    updateReview
};
