require('dotenv').config()
const mysql = require('mysql2');


const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

config.connect(function(err){
    if (err) throw err;
    console.log("Succesfully conected :))")
});

module.exports = {config};