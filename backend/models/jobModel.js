// models/jobModel.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: Number, required: true },
  image: { type: String, required: false }, // Optional field
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
