const express = require('express');
const { signup, login, getMe, logout, updateMe, deleteMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, upload.any(), updateMe);
router.patch('/me', protect, upload.any(), updateMe);

router.delete('/me', protect, deleteMe);
router.post('/logout', protect, logout);

module.exports = router;
