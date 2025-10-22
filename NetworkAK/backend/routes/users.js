import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Update user profile
router.put('/profile', [
  authenticate,
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL')
], async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = req.userObj;

    // Update only provided fields
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get user dashboard data based on role (mock data for now)
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const user = req.userObj;

    let dashboardData = {
      user: user.toJSON(),
      stats: {},
      recentActivity: []
    };

    switch (user.role) {
      case 'member': // Buyer dashboard
        dashboardData.stats = {
          totalPurchases: 0,
          favoriteItems: 0,
          savedSearches: 0
        };
        dashboardData.recentActivity = [
          { type: 'welcome', message: 'Welcome to NetworkAK! Browse items and make your first purchase.' }
        ];
        break;

      case 'cretro': // Seller dashboard
        dashboardData.stats = {
          totalItems: 0,
          totalSales: 0,
          totalEarnings: 0,
          activeListings: 0
        };
        dashboardData.recentActivity = [
          { type: 'welcome', message: 'Welcome to NetworkAK! Start selling by creating your first listing.' }
        ];
        break;

      case 'peruim': // Premium buyer dashboard
        dashboardData.stats = {
          totalPurchases: 0,
          premiumDiscounts: 0,
          vipAccess: true,
          memberSince: user.createdAt
        };
        dashboardData.recentActivity = [
          { type: 'premium', message: 'Premium member benefits activated! Enjoy exclusive discounts.' }
        ];
        break;

      default:
        dashboardData.stats = { message: 'Welcome to NetworkAK!' };
    }

    res.json({
      success: true,
      dashboard: dashboardData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

export default router;
