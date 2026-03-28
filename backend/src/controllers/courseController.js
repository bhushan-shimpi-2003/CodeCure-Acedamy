const CourseModel = require('../models/Course');
const ModuleModel = require('../models/Module');

// @desc    Get all published courses (public catalog)
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.getAllPublishedCourses();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single course by slug or ID
// @route   GET /api/courses/:idOrSlug
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let course;

    // Try slug first, then UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(idOrSlug)) {
      course = await CourseModel.getCourseById(idOrSlug);
    } else {
      course = await CourseModel.getCourseBySlug(idOrSlug);
    }

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    // Get modules for the course
    const modules = await ModuleModel.getModulesByCourse(course.id);

    res.status(200).json({ success: true, data: { ...course, modules } });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (teacher, admin)
exports.createCourse = async (req, res, next) => {
  try {
    let instructor_id = req.user.id;
    if (req.user.role === 'admin' && req.body.instructor_id) {
      instructor_id = req.body.instructor_id;
    }
    const courseData = {
      ...req.body,
      instructor_id,
    };
    const course = await CourseModel.createCourse(courseData);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (teacher owner, admin)
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await CourseModel.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    // Only owner teacher or admin can update
    if (course.instructor_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to update this course' });
    }

    const updated = await CourseModel.updateCourse(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (admin)
exports.deleteCourse = async (req, res, next) => {
  try {
    await CourseModel.deleteCourse(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all courses (admin - includes drafts)
// @route   GET /api/courses/admin/all
// @access  Private (admin)
exports.getAllCoursesAdmin = async (req, res, next) => {
  try {
    const courses = await CourseModel.getAllCourses();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// @desc    Get my courses (teacher)
// @route   GET /api/courses/teacher/my
// @access  Private (teacher)
exports.getMyCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.getCoursesByInstructor(req.user.id);
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// --- MODULE ENDPOINTS ---

// @desc    Get modules for a course
// @route   GET /api/courses/:courseId/modules
// @access  Public
exports.getModules = async (req, res, next) => {
  try {
    const modules = await ModuleModel.getModulesByCourse(req.params.courseId);
    res.status(200).json({ success: true, count: modules.length, data: modules });
  } catch (err) {
    next(err);
  }
};

// @desc    Add module to course
// @route   POST /api/courses/:courseId/modules
// @access  Private (teacher, admin)
exports.addModule = async (req, res, next) => {
  try {
    const moduleData = { ...req.body, course_id: req.params.courseId };
    const mod = await ModuleModel.createModule(moduleData);
    res.status(201).json({ success: true, data: mod });
  } catch (err) {
    next(err);
  }
};

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private (teacher, admin)
exports.updateModule = async (req, res, next) => {
  try {
    const mod = await ModuleModel.updateModule(req.params.id, req.body);
    res.status(200).json({ success: true, data: mod });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private (teacher, admin)
exports.deleteModule = async (req, res, next) => {
  try {
    await ModuleModel.deleteModule(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
