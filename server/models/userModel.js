const db = require('../services/database').config;

let getUsers = () => new Promise((resolve, reject)=>{
    db.query("SELECT * FROM users_hh", function (err, users, fields){
        if(err) {
            reject(err)
        }else{
            resolve(users)
        }
    })
});

module.exports = {
    getUsers
};