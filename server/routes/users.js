const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../services/authentication');

router.get('/', auth.authenticateJWT, userController.getUsers);

router.get('/:id', auth.authenticateJWT, userController.getUser);
router.post('/edit/:id', auth.authenticateJWT, userController.updateUser);
router.post('/delete/:id', auth.authenticateJWT, userController.deleteUser);


module.exports = router;