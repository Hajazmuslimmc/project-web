import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'networkak-secret-key');
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. User not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated.'
        });
      }

      // Attach user to request
      req.user = decoded;
      req.userObj = user; // Full user object for more complex operations
      next();

    } catch (tokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }

  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.userObj) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.'
        });
      }

      if (!roles.includes(req.userObj.role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during authorization.'
      });
    }
  };
};

// Optional authentication middleware (for cases where auth is optional)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without authentication
      next();
      return;
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      // No token, continue without authentication
      next();
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'networkak-secret-key');
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = decoded;
        req.userObj = user;
      }

      next();

    } catch (tokenError) {
      // Invalid token, continue without authentication
      next();
    }

  } catch (error) {
    console.error('Optional authentication error:', error);
    // Continue without authentication even if there's an error
    next();
  }
};
