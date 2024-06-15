const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./services/database.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', moviesRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Enter at your own risk at http://localhost:${port}`);
});