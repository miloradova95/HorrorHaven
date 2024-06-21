import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get('/watchlist');
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setError('Failed to fetch watchlist. Please log in.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete('/watchlist/remove', { data: { movieId } });
      setWatchlist(watchlist.filter(movie => movie.movie_id !== movieId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist. Add some!</p>
      ) : (
        <ul>
          {watchlist.map(movie => (
            <li key={movie.movie_id}>
              <span>{movie.title}</span>
              <button onClick={() => navigate(`/movies/${movie.movie_id}`)}>View Details</button>
              <button onClick={() => removeFromWatchlist(movie.movie_id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
