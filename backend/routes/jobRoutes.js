const express = require('express');
const router = express.Router();
const { getJobs, createPost } = require('../controllers/CreatePost');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', authenticateUser, getJobs);
router.post('/create', authenticateUser, createPost); // Optional: protect this too

module.exports = router;
