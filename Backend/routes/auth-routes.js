const express = require('express')
const router = express.Router()
const {registerUser,loginUser} = require('../controller/auth-controller.js')
const authMiddleware = require('../middleware/middleware.js');

// all routes are related to authentication and authorization
router.post('/register',registerUser)
router.post('/login',loginUser)

// 🔒 Protected route
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      user: req.user, // comes from JWT
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user info',
    });
  }
});

module.exports = router