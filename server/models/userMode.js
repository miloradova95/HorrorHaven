const dv = require('./services/database');

let getUsers = () => new Promise((resolve, reject)=>{
    db.query("SELECT * FROM users", function (err, users, fields){
        if(err) {
            reject(err)
        }else{
            resolve(users)
        }
    })
})