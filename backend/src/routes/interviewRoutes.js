const express = require('express');
const {
  scheduleInterview, getMyInterviews, getTeacherInterviews, getAllInterviews, completeInterview,
} = require('../controllers/interviewController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('teacher', 'admin'), scheduleInterview);
router.get('/me', protect, authorize('student'), getMyInterviews);
router.get('/teacher', protect, authorize('teacher'), getTeacherInterviews);
router.get('/', protect, authorize('admin'), getAllInterviews);
router.put('/:id/complete', protect, authorize('teacher', 'admin'), completeInterview);

module.exports = router;
