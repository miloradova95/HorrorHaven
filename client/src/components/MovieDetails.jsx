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

  if (!movie) {
    return <div>Loading...</div>; // Placeholder while movie details are being fetched
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} style={{ maxWidth: '300px' }} />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate}</p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieDetails;