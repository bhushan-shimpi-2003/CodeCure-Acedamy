const express = require('express');
const {
  getAllBatches, getBatchesByCourse, createBatch, updateBatch, deleteBatch
} = require('../controllers/batchController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'teacher'), getAllBatches);
router.get('/course/:courseId', getBatchesByCourse);

router.post('/', authorize('admin'), createBatch);
router.put('/:id', authorize('admin'), updateBatch);
router.delete('/:id', authorize('admin'), deleteBatch);

module.exports = router;
