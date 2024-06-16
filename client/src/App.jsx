// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Register from './components/Register';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Profile from './components/Profile';
import MovieDetails from './components/MovieDetails'; // Import MovieDetails component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/movies/:id" element={<MovieDetails />} /> {/* New route for MovieDetails */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
