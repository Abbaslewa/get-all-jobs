// In controllers/CreatePost.js
const Job = require('../models/jobModel');  // Ensure the job model is correctly imported

// POST: Create a new job post
const createPost = async (req, res) => {
  try {
    const { title, company, location, jobType, salary, image, userId } = req.body;

    // Create a new job post
    const newJob = new Job({
      title,
      company,
      location,
      jobType,
      salary,
      image,
      userId,
    });

    // Save the new job to the database
    await newJob.save();
    
    // Respond with the new job post
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job', error });
  }
};

// GET: Fetch all job posts
const getJobs = async (req, res) => {
  try {
    // Get jobs for the authenticated user (assuming `userId` is in the request)
    const jobs = await Job.find({ userId: req.userId });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

module.exports = { createPost, getJobs };  // Make sure to export both functions
