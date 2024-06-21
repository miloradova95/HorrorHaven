// MovieDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axiosConfig'; // Import axios instance configured for your backend

const MovieDetails = () => {
  const { id } = useParams(); // Extract movie ID from URL parameter
  const [movie, setMovie] = useState(null); // State to hold movie details

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`); // Assuming endpoint for fetching movie details
        setMovie(response.data); // Set movie details in state
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToWatchlist = async () => {
    try {
      await axios.post('/watchlist/add', { movieId: id });
      alert('Movie added to watchlist');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      if (error.response && error.response.status === 401) {
        alert('Please log in to add to watchlist');
      }
    }
  };

  if (!movie) {
    return <div>Loading...</div>; // Placeholder while movie details are being fetched
  }

  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="movie-rating">
          {[...Array(5)].map((star, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </div>
        <div className="movie-actions">
          <button onClick={addToWatchlist}>Add to List</button>
          <button>Reviews</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
