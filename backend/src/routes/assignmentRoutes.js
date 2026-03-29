const express = require('express');
const {
  createAssignment, getAssignmentsByCourse, getAllAssignments,
  submitAssignment, getMySubmissions, gradeSubmission, getSubmissionsByAssignment
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Teacher
router.post('/', protect, authorize('teacher', 'admin'), createAssignment);
router.get('/:id/submissions', protect, authorize('teacher', 'admin'), getSubmissionsByAssignment);

// Student
router.post('/:id/submit', protect, authorize('student'), submitAssignment);
router.get('/submissions/me', protect, authorize('student'), getMySubmissions);

// Teacher grade
router.put('/submissions/:id/grade', protect, authorize('teacher', 'admin'), gradeSubmission);

// Shared
router.get('/course/:courseId', protect, getAssignmentsByCourse);

// Admin
router.get('/', protect, authorize('admin'), getAllAssignments);

module.exports = router;
