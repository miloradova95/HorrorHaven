import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Horror Haven Logo" />
      <div className="links">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/register">Register</Link>
            <Link to="/users">Users</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
