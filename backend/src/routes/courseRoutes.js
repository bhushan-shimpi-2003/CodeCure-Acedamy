const express = require('express');
const {
  getCourses, getCourse, createCourse, updateCourse, deleteCourse,
  getAllCoursesAdmin, getMyCourses, getModules, addModule, updateModule, deleteModule,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.get('/', getCourses);
router.get('/:idOrSlug', getCourse);
router.get('/:courseId/modules', getModules);

// Teacher
router.get('/teacher/my', protect, authorize('teacher', 'admin'), getMyCourses);

// Admin
router.get('/admin/all', protect, authorize('admin'), getAllCoursesAdmin);

// Create / Update / Delete
router.post('/', protect, authorize('teacher', 'admin'), createCourse);
router.put('/:id', protect, authorize('teacher', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

// Modules
router.post('/:courseId/modules', protect, authorize('teacher', 'admin'), addModule);
router.put('/modules/:id', protect, authorize('teacher', 'admin'), updateModule);
router.delete('/modules/:id', protect, authorize('teacher', 'admin'), deleteModule);

module.exports = router;
