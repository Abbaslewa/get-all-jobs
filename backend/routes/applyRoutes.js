const express = require('express');
const router = express.Router();
const { upload, applyForJob, getUserApplications } = require('../controllers/applyController');

// POST route to apply
router.post('/apply', upload.single('resume'), applyForJob);

// GET route for getting applications
router.get('/applications', getUserApplications);

module.exports = router;
