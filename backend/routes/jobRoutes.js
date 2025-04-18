// routes/jobRoutes.js
const express = require('express');
const { createPost, getJobs, deletePost } = require('../controllers/CreatePost');  // Import the controller
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const router = express.Router();

// Route to create a new job post
router.post('/create', authMiddleware, createPost);  // Add authentication for create

// Route to get all job posts
router.get('/', getJobs);

// Route to delete a job post
router.delete('/:jobId', authMiddleware, deletePost); // Add DELETE route with authentication

module.exports = router;
