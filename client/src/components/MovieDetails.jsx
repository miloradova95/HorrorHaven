import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axiosConfig';
import { AuthContext } from './AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If no reviews are found, set reviews to an empty array
          setReviews([]);
        } else {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [id]);


  const addToWatchlist = async () => {
    if (!user) {
      alert('Please log in to add to watchlist');
      return;
    }

    try {
      await axios.post('/watchlist/add', { userId: user.id, movieId: id });
      alert('Movie added to watchlist');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };


  const submitReview = async () => {
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }

    try {
      const response = await axios.post('/reviews/add', {
        userId: user.id,
        movieId: id,
        rating,
        comment,
      });
      setReviews([...reviews, response.data]);
      setRating(0);
      setComment('');
      alert('Review submitted');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };


  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/delete/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      alert('Review deleted');
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const editReview = async (reviewId) => {
    try {
      const response = await axios.put(`/reviews/edit/${reviewId}`, {
        rating: editRating,
        comment: editComment,
      });
      alert('Review updated successfully');
      setReviews(reviews.map((r) => (r.id === reviewId ? response.data : r)));
      setEditingReviewId(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };


  const handleEdit = (review) => {
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditingReviewId(review.id);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="movie-actions">
          <button onClick={addToWatchlist}>Add to List</button>
        </div>

        {user && (
          <div className="review-section">
            <h3>Submit Your Review</h3>
            <div className="review-rating">
              <label>Rating:</label>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => setRating(index + 1)}
                  style={{ cursor: 'pointer', color: index < rating ? '#ffcc00' : '#ccc' }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={submitReview}>Submit Review</button>
          </div>
        )}

        <div className="reviews-list">
          <h3>User Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                {editingReviewId === review.id ? (
                  <div>
                    <label>Edit Rating:</label>
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          onClick={() => setEditRating(index + 1)}
                          style={{ cursor: 'pointer', color: index < editRating ? '#ffcc00' : '#ccc' }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <textarea
                      placeholder="Edit your comment"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <button onClick={() => editReview(review.id)}>Save Changes</button>
                  </div>
                ) : (
                  <div>
                    <strong>{review.username}</strong> - {review.rating}/5
                    <p>{review.comment}</p>
                    {user && user.id === review.user_id && (
                      <div>
                        <button onClick={() => handleEdit(review)}>Edit</button>
                        <button onClick={() => deleteReview(review.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
