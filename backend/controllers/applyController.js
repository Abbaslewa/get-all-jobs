const multer = require('multer');
const path = require('path');
const Application = require('../models/applyModel');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadFolder = 'uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Submit job application
const applyForJob = async (req, res) => {
  try {
    const { fullName, email, jobId } = req.body;
    const file = req.file?.filename;

    if (!file) {
      return res.status(400).json({ message: 'Resume is required.' });
    }

    const newApplication = new Application({
      fullName,
      email,
      jobId,
      resume: file,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { upload, applyForJob, getUserApplications };
