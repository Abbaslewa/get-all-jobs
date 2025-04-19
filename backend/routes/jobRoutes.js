const express = require('express');
const { createPost, getJobs, deletePost } = require('../controllers/CreatePost');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.get('/', getJobs);
router.delete('/:jobId', authMiddleware, deletePost);

module.exports = router;
