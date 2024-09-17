import React, { useContext, useEffect, useState } from 'react';
import axios from './axiosConfig';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`/watchlist/${user.id}`);
          const watchlistMovies = response.data;

          const movieDetailsPromises = watchlistMovies.map(async (movie) => {
            const movieDetailsResponse = await axios.get(`/movies/${movie.movie_id}`);
            return movieDetailsResponse.data;
          });

          const movieDetails = await Promise.all(movieDetailsPromises);
          setWatchlist(movieDetails);
        } catch (error) {
          console.error('Error fetching watchlist:', error);
          setError('Failed to fetch watchlist. Please try again later.');
        }
      }
    };

    fetchWatchlist();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your watchlist.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h1>Your Watchlist</h1>
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
          {watchlist.map((movie) => (
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
};

export default Watchlist;
