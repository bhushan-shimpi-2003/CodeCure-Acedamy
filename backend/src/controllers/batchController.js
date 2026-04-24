const BatchModel = require('../models/Batch');

// @desc    Get all batches
// @route   GET /api/batches
// @access  Private (Admin/Teacher)
exports.getAllBatches = async (req, res, next) => {
  try {
    const batches = await BatchModel.getAllBatches();
    res.status(200).json({ success: true, count: batches.length, data: batches });
  } catch (err) {
    next(err);
  }
};

// @desc    Get batches by course
// @route   GET /api/courses/:courseId/batches
// @access  Private
exports.getBatchesByCourse = async (req, res, next) => {
  try {
    const batches = await BatchModel.getBatchesByCourse(req.params.courseId);
    res.status(200).json({ success: true, count: batches.length, data: batches });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a batch
// @route   POST /api/batches
// @access  Private (Admin)
exports.createBatch = async (req, res, next) => {
  try {
    const batch = await BatchModel.createBatch(req.body);
    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a batch
// @route   PUT /api/batches/:id
// @access  Private (Admin)
exports.updateBatch = async (req, res, next) => {
  try {
    const batch = await BatchModel.updateBatch(req.params.id, req.body);
    res.status(200).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a batch
// @route   DELETE /api/batches/:id
// @access  Private (Admin)
exports.deleteBatch = async (req, res, next) => {
  try {
    await BatchModel.deleteBatch(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
