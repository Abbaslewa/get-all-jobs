const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is set
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
