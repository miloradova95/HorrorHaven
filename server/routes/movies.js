const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_API_KEY = '150619935655a9c7f79ae49870a34389';

router.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;