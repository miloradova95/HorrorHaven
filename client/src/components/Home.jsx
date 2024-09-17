import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from './axiosConfig'; 
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        const allMovies = response.data.results;
        const randomMovies = allMovies.sort(() => 0.5 - Math.random()).slice(0, 5);
        setMovies(randomMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <h1 className="main-heading">Featured Movies</h1>
      <div className="slick-slider">
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id} style={{ position: 'relative' }} onClick={() => handleMovieClick(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ cursor: 'pointer' }}
              />
              <div className="slide-content">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
