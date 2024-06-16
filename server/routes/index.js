const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/cookies', (req, res) => {
    let counter = req.cookies['visitCounter'];
    if (isNaN(counter)) counter = 0;
    counter ++;
    res.cookie('visitCounter', counter, { maxAge: 2*60*60*1000 });
    res.send('Mmm I have ' + counter + ' bullets... I mean cookies');
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


module.exports = router;