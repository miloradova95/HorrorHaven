import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            {movie.title}
            {movie.poster}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ width: "150px" }} alt={movie.title || movie.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
