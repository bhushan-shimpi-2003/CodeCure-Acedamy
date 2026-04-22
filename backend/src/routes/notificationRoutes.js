const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verifyToken);

/**
 * Public notification routes (authenticated users)
 */

// GET /api/notifications/me - Get all notifications for current user
router.get('/me', notificationController.getMyNotifications);

// GET /api/notifications/unread-count - Get unread notification count
router.get('/unread-count', notificationController.getUnreadCount);

// GET /api/notifications/:id - Get a single notification
router.get('/:id', notificationController.getNotificationById);

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', notificationController.markAsRead);

// PUT /api/notifications/read-all - Mark all notifications as read
router.put('/read-all', notificationController.markAllAsRead);

// DELETE /api/notifications/:id - Delete a notification
router.delete('/:id', notificationController.deleteNotification);

/**
 * Admin-only routes
 */

// POST /api/notifications/send - Send notification to users/roles (Admin only)
router.post('/send', notificationController.sendNotification);

// DELETE /api/notifications - Delete all notifications for a user (Admin only)
router.delete('/', notificationController.deleteAllNotifications);

module.exports = router;
