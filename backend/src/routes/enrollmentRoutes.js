const express = require('express');
const {
  requestEnrollment, getMyRequests, getPendingRequests, resolveRequest,
  getMyEnrollments, getAllEnrollments, updateEnrollment,
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Student
router.post('/request', protect, authorize('student'), requestEnrollment);
router.get('/requests/me', protect, authorize('student'), getMyRequests);
router.get('/me', protect, authorize('student'), getMyEnrollments);

// Admin
router.get('/requests/pending', protect, authorize('admin'), getPendingRequests);
router.put('/requests/:id', protect, authorize('admin'), resolveRequest);
router.get('/', protect, authorize('admin'), getAllEnrollments);
router.put('/:id', protect, authorize('admin'), updateEnrollment);

module.exports = router;
