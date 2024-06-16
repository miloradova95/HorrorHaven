const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../services/authentication');

async function registerUser(req, res)  {
    const { username, name, surname, email, info, password, image } = req.body;

    try {
        const newUser = await userModel.addUser({ username, name, surname, email, info, password, image });
        res.status(201).json({ message: 'User registered sucessfully', user: newUser });
    } catch (error) {
        console.error('Error while registering user:', error);
        res.status(500).json({ message: 'Error while registering user' });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const users = await userModel.getUsers();
        await authenticateUser({ username, password }, users, res);
    } catch (error) {
        console.error('Error while logging in user:', error);
        res.status(500).json({ message: 'Error while logging in user' });
    }
}


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

async function getUser(req, res) {
    try {
        const user = await userModel.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error while getting user:', error);
        res.status(500).json({ message: 'Error while getting user' });
    }
}

async function updateUser(req, res) {
    try {
        const user = await userModel.updateUser(req.body);
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(500).json({ message: 'Error while updating user' });
    }
}

async function deleteUser(req, res) {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error while deleting user:', error);
        res.status(500).json({ message: 'Error while deleting user' });
    }
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}