const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const applyRoutes = require('./routes/applyRoutes');
const { registerUser, loginUser } = require('./controllers/userController');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);  // Handles all job-related routes (including DELETE)
app.use('/api/users/login', loginUser);
app.use('/api/users/register', registerUser);
app.use('/api', applyRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
