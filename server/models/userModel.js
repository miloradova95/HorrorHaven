const db = require('../services/database').config;
const bcrypt = require('bcrypt');

let getUsers = () => new Promise((resolve, reject)=>{
    db.query("SELECT * FROM users_hh", function (err, users, fields){
        if(err) {
            reject(err)
        }else{
            resolve(users)
        }
    })
});

let addUser = (userData) => new Promise(async (resolve, reject)=>{
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "INSERT INTO users_hh (username, name, surname, email, info, password, image) VALUES ("+
        db.escape(userData.username)+", "+
        db.escape(userData.name)+", "+
        db.escape(userData.surname)+", "+
        db.escape(userData.email)+", "+
        db.escape(userData.info)+", "+
        db.escape(userData.password)+", "+
        db.escape(userData.image)+")";
    console.log(sql);
    db.query(sql, function (err, result){
        if(err){
            reject(err)
        }else{
            console.log(result.affectedRows + " rows have been affected");
            resolve(userData)
        }
    })
});

let getUser = (id) => new Promise((resolve, reject)=>{
    db.query("SELECT * FROM users_hh WHERE id = ?", [id], function (err, result) {
        if(err){
            reject(err)
        } else if (result.length === 0) {
            reject(new Error('User not found'));
        } else {
            resolve(result[0]);
        }
    });
});

let updateUser = (userData) => new Promise(async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE users_hh SET " +
        "username = " + db.escape(userData.username) +
        ", name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info) +
        ", image = " + db.escape(userData.image) +
        " WHERE id = " + parseInt(userData.id);
    db.query(sql, function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(userData);
        }
    });
});

let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query("DELETE FROM users_hh WHERE id = ?", [id], function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});


module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
};