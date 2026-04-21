const express = require('express');
const { getDashboardStats, getRecentActivity } = require('../controllers/teacherController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply protection to all teacher dashboard routes
router.use(protect);
router.use(authorize('teacher', 'admin'));

/**
 * @route   GET /api/teacher/dashboard/stats
 * @desc    Get aggregate stats for teacher dashboard
 */
router.get('/dashboard/stats', getDashboardStats);

/**
 * @route   GET /api/teacher/dashboard/activity
 * @desc    Get recent student activities relevant to the teacher
 */
router.get('/dashboard/activity', getRecentActivity);

module.exports = router;
