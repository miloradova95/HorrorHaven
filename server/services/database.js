require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "cc231051",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const config = pool.promise();

module.exports = { config };
