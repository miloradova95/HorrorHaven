import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';

function MovieList() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        const moviesWithDetails = await Promise.all(
          response.data.results.map(async (movie) => {
            // Make another API call to fetch details (runtime, etc.)
            const movieDetails = await axios.get(`http://localhost:3000/movies/${movie.id}`);
            return {
              ...movie,
              runtime: movieDetails.data.runtime || 'Unknown', // Set runtime if available
            };
          })
        );
        setMovies(moviesWithDetails);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="table-container">
      <h1>Popular Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year of release</th>
            <th>Duration</th>
            <th>Rating</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </td>
              <td>{movie.release_date.split('-')[0]}</td>
              <td>{`${movie.runtime} min.`}</td>
              <td>{movie.vote_average}</td>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MovieList;
