const express = require('express');
const {
  getLiveClasses, getAllLiveClasses, createLiveClass, updateLiveClass, deleteLiveClass,
  getRecordings, createRecording, markAttendance, getAttendance,
  sendLiveMessage, getLiveMessages
} = require('../controllers/liveClassController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Live Classes
router.get('/course/all', authorize('admin'), getAllLiveClasses);
router.get('/course/:courseId', getLiveClasses);
router.post('/', authorize('teacher', 'admin'), createLiveClass);
router.put('/:id', authorize('teacher', 'admin'), updateLiveClass);
router.delete('/:id', authorize('teacher', 'admin'), deleteLiveClass);

// Recordings
router.get('/recordings/course/:courseId', getRecordings);
router.post('/recordings', authorize('teacher', 'admin'), createRecording);

// Attendance
router.post('/attendance', markAttendance);
router.get('/attendance/:liveClassId', authorize('teacher', 'admin'), getAttendance);

// Messages
router.post('/messages', sendLiveMessage);
router.get('/messages/:liveClassId', getLiveMessages);

module.exports = router;
