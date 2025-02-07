import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Register from './components/Register';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Profile from './components/Profile';
import MovieDetails from './components/MovieDetails';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import horrorHavenLogo from './assets/HH.png';
import { AuthProvider } from './components/AuthContext';
import './App.css';



function App() {
  return (
    <AuthProvider>
    <Router>
      <div>
        <Navbar />
        <div className="main-heading">
          <img src={horrorHavenLogo} alt="HorrorHaven Logo" />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />

        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
