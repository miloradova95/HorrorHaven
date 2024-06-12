const express = require('express');
const router = express.Router();

router.get('/cookies', (req, res) => {
    let counter = req.cookies['visitCounter'];
    if (isNaN(counter)) counter = 0;
    counter ++;
    res.cookie('visitCounter', counter, { maxAge: 2*60*60*1000 });
    res.send('Mmm I have ' + counter + ' bullets... I mean cookies');
});

module.exports = router;