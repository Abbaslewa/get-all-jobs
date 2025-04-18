const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  jobType: String,
  salary: Number,
  image: String,
  userId: String,
});

module.exports = mongoose.model('Job', jobSchema);
