const db = require('../services/database').config;
const bcrypt = require('bcrypt');


let getUsers = async () => {
    try {
        const [users] = await db.query("SELECT * FROM users_hh");
        return users;
    } catch (err) {
        throw err;
    }
};


let addUser = async (userData) => {
    try {
        userData.password = await bcrypt.hash(userData.password, 10);
        const sql = "INSERT INTO users_hh (username, name, surname, email, info, password, images) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [userData.username, userData.name, userData.surname, userData.email, userData.info, userData.password, userData.images];

        const [result] = await db.query(sql, values);
        console.log(result.affectedRows + " rows have been affected");
        return userData;
    } catch (err) {
        throw err;
    }
};


let getUser = async (id) => {
    try {
        const [result] = await db.query("SELECT * FROM users_hh WHERE id = ?", [id]);
        if (result.length === 0) {
            throw new Error('User not found');
        }
        return result[0];
    } catch (err) {
        throw err;
    }
};


let updateUser = async (userData) => {
    try {
        userData.password = await bcrypt.hash(userData.password, 10);
        const sql = "UPDATE users_hh SET username = ?, name = ?, surname = ?, email = ?, info = ?, images = ? WHERE id = ?";
        const values = [userData.username, userData.name, userData.surname, userData.email, userData.info, userData.images, parseInt(userData.id)];

        await db.query(sql, values);
        return userData;
    } catch (err) {
        throw err;
    }
};


let deleteUser = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM users_hh WHERE id = ?", [id]);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
};
