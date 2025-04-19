const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  jobId: { type: String },
  resume: { type: String }, // or `required: true` if resume is always mandatory
}, { timestamps: true });

module.exports = mongoose.model('Application', applySchema);
