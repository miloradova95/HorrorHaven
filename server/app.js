const express = require('express');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter); // Mount usersRouter on /users path

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Enter at your own risk at http://localhost:${port}`);
});