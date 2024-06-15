const userModel = require('../models/userModel');

function getUsers(req, res) {
    userModel.getUsers()
        .then((users)=>{
            console.log(users);
        res.json(users)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send('Error in getting users')
    })}



module.exports = {
    getUsers
}