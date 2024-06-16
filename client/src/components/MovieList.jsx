// MovieList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                style={{ width: "150px", margin: "10px" }}
                alt={movie.title || movie.name}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
