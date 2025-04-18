const Job = require('../models/jobModel');  // Ensure path is correct

// Handler function for creating a job post
const createPost = async (req, res) => {
  try {
    const { title, company, location, jobType, salary, image, userId } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      jobType,
      salary,
      image,
      userId,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handler function for getting all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();  // Fetch all jobs from the database
    res.status(200).json(jobs);     // Respond with the list of jobs
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handler function for deleting a job post
const deletePost = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.userId; // User ID from the JWT payload

    console.log('jobId:', jobId, 'userId:', userId); // Debug log

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Ensure the job belongs to the authenticated user
    if (job.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this job' });
    }

    // Delete the job
    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getJobs, deletePost };
