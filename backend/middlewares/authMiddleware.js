import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to protect routes
async function protect(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
      token = token.split(' ')[1]; //Extract Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Token failed', error: err.message });
  }
}

export { protect };
