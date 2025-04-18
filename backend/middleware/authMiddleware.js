const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust path as necessary

// Middleware to authenticate and extract userId from the token
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust secret key as needed

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userId = decoded.userId; // Attach userId to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
