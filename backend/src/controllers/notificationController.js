const NotificationModel = require('../models/Notification');

/**
 * @desc    Get all notifications for logged-in user
 * @route   GET /api/notifications/me
 * @access  Private
 */
exports.getMyNotifications = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = (page - 1) * limit;

    const notifications = await NotificationModel.getNotificationsByUserId(userId, limit, offset);
    const unreadCount = await NotificationModel.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    next(error);
  }
};

/**
 * @desc    Get unread notification count
 * @route   GET /api/notifications/unread-count
 * @access  Private
 */
exports.getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const count = await NotificationModel.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    next(error);
  }
};

/**
 * @desc    Get a single notification by ID
 * @route   GET /api/notifications/:id
 * @access  Private
 */
exports.getNotificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const notification = await NotificationModel.getNotificationById(id);

    // Check if user owns this notification
    if (notification.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized to view this notification' });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error('Error fetching notification:', error);
    next(error);
  }
};

/**
 * @desc    Mark a notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Verify ownership
    const notification = await NotificationModel.getNotificationById(id);
    if (notification.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    const updated = await NotificationModel.markAsRead(id);

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    next(error);
  }
};

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private
 */
exports.markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const updated = await NotificationModel.markAllAsRead(userId);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      updatedCount: updated.length,
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    next(error);
  }
};

/**
 * @desc    Delete a notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
exports.deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Verify ownership
    const notification = await NotificationModel.getNotificationById(id);
    if (notification.user_id !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await NotificationModel.deleteNotification(id);

    res.status(200).json({
      success: true,
      message: 'Notification deleted',
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    next(error);
  }
};

/**
 * @desc    Send notification to users (Admin only)
 * @route   POST /api/notifications/send
 * @access  Private/Admin
 */
exports.sendNotification = async (req, res, next) => {
  try {
    const userRole = req.user?.role;

    // Allow admin, teacher, or student to trigger notifications
    if (userRole !== 'admin' && userRole !== 'teacher' && userRole !== 'student') {
      return res.status(403).json({ success: false, error: 'Only authorized roles can send notifications' });
    }

    const { user_id, role, title, message, type, related_entity_id, related_entity_type } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Title and message are required' });
    }

    if (!user_id && !role) {
      return res.status(400).json({ success: false, error: 'Either user_id or role must be provided' });
    }

    const notifications = await NotificationModel.sendNotification({
      user_id,
      role,
      title,
      message,
      type,
      related_entity_id,
      related_entity_type,
    });

    res.status(201).json({
      success: true,
      message: `Notification sent to ${notifications.length} user(s)`,
      data: notifications,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    next(error);
  }
};

/**
 * @desc    Delete all notifications for a user (Admin only)
 * @route   DELETE /api/notifications
 * @access  Private/Admin
 */
exports.deleteAllNotifications = async (req, res, next) => {
  try {
    const userRole = req.user?.role;
    const { user_id } = req.body;

    if (userRole !== 'admin') {
      return res.status(403).json({ success: false, error: 'Only admin can delete all notifications' });
    }

    if (!user_id) {
      return res.status(400).json({ success: false, error: 'user_id is required' });
    }

    await NotificationModel.deleteAllUserNotifications(user_id);

    res.status(200).json({
      success: true,
      message: 'All notifications deleted',
    });
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    next(error);
  }
};
