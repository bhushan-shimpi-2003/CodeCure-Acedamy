const LiveClassModel = require('../models/LiveClass');

// @desc    Get live classes by course
// @route   GET /api/live-classes/course/:courseId
// @access  Private
exports.getLiveClasses = async (req, res, next) => {
  try {
    const liveClasses = await LiveClassModel.getLiveClassesByCourse(req.params.courseId);
    res.status(200).json({ success: true, count: liveClasses.length, data: liveClasses });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all live classes
// @route   GET /api/live-classes/course/all
// @access  Private (Admin)
exports.getAllLiveClasses = async (req, res, next) => {
  try {
    const { data, error } = await require('../config/supabaseClient')
      .from('live_classes')
      .select('*, profiles!teacher_id(id, name), courses(id, title)');
    if (error) throw error;
    res.status(200).json({ success: true, count: data.length, data: data });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a live class
// @route   POST /api/live-classes
// @access  Private (Teacher/Admin)
exports.createLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClassModel.createLiveClass({
      ...req.body,
      teacher_id: req.user.id
    });
    res.status(201).json({ success: true, data: liveClass });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a live class
// @route   PUT /api/live-classes/:id
// @access  Private (Teacher/Admin)
exports.updateLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClassModel.updateLiveClass(req.params.id, req.body);
    res.status(200).json({ success: true, data: liveClass });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a live class
// @route   DELETE /api/live-classes/:id
// @access  Private (Teacher/Admin)
exports.deleteLiveClass = async (req, res, next) => {
  try {
    await LiveClassModel.deleteLiveClass(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// --- Recordings ---
exports.getRecordings = async (req, res, next) => {
  try {
    const recordings = await LiveClassModel.getRecordingsByCourse(req.params.courseId);
    res.status(200).json({ success: true, count: recordings.length, data: recordings });
  } catch (err) {
    next(err);
  }
};

exports.createRecording = async (req, res, next) => {
  try {
    const recording = await LiveClassModel.createRecording(req.body);
    res.status(201).json({ success: true, data: recording });
  } catch (err) {
    next(err);
  }
};

// --- Attendance ---
exports.markAttendance = async (req, res, next) => {
  try {
    const attendance = await LiveClassModel.markAttendance({
      ...req.body,
      user_id: req.user.id
    });
    res.status(201).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

exports.getAttendance = async (req, res, next) => {
  try {
    const attendance = await LiveClassModel.getAttendanceByLiveClass(req.params.liveClassId);
    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

// --- Live Messages ---
exports.sendLiveMessage = async (req, res, next) => {
  try {
    const message = await LiveClassModel.sendLiveMessage({
      ...req.body,
      user_id: req.user.id
    });
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
};

exports.getLiveMessages = async (req, res, next) => {
  try {
    const messages = await LiveClassModel.getLiveMessages(req.params.liveClassId);
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
};
