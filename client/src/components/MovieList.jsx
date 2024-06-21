// MovieList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const addToWatchlist = async (movieId) => {
    try {
      await axios.post('/watchlist/add', { movieId });
      alert('Movie added to watchlist');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      if (error.response && error.response.status === 401) {
        alert('Please log in to add to watchlist');
      }
    }
  };

  return (
    <div className="table-container">
      <h1>Popular Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year of release</th>
            <th>Duration</th>
            <th>Director</th>
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
              <td>{movie.director}</td>
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
