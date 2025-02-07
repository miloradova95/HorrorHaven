require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};





app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const watchlistRouter = require('./routes/watchlist');
const reviewRouter = require('./routes/reviewRoutes');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/watchlist', watchlistRouter);
app.use('/reviews', reviewRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
