const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

// Route: POST /api/users/register
router.post('/register', registerUser);

// Route: POST /api/users/login
router.post('/login', loginUser);

// Route: POST /api/users/logout
router.post('/logout', logoutUser);

module.exports = router;
