const supabase = require('../config/supabaseClient');

/**
 * Notification Model — maps to `notifications` table
 * Handles user notifications for courses, assignments, messages, etc.
 */

// Get all notifications for a user
exports.getNotificationsByUserId = async (userId, limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data;
};

// Get unread notifications count for a user
exports.getUnreadCount = async (userId) => {
  const { error, count } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);
  
  if (error) {
    console.error('[NotificationModel] getUnreadCount error:', error.message);
    return 0;
  }
  return count || 0;
};

// Get a single notification by ID
exports.getNotificationById = async (notificationId) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', notificationId)
    .single();
  
  if (error) throw error;
  return data;
};

// Create a new notification
exports.createNotification = async (notificationData) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notificationData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Create notifications for multiple users
exports.createBulkNotifications = async (notificationsData) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notificationsData)
    .select();
  
  if (error) throw error;
  return data;
};

// Mark a notification as read
exports.markAsRead = async (notificationId) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true, read_at: new Date() })
    .eq('id', notificationId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Mark all notifications as read for a user
exports.markAllAsRead = async (userId) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true, read_at: new Date() })
    .eq('user_id', userId)
    .eq('is_read', false)
    .select();
  
  if (error) throw error;
  return data;
};

// Delete a notification
exports.deleteNotification = async (notificationId) => {
  const { data, error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Delete all notifications for a user
exports.deleteAllUserNotifications = async (userId) => {
  const { data, error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data;
};

// Send notification to specific users or roles
exports.sendNotification = async (notificationData) => {
  const { user_id, role, title, message, type, related_entity_id, related_entity_type } = notificationData;
  
  let targetUsers = [];
  
  if (user_id) {
    // Send to specific user
    targetUsers = [{ id: user_id }];
  } else if (role) {
    // Send to all users with specific role
    const { data: users, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', role);
    
    if (fetchError) throw fetchError;
    targetUsers = users;
  }
  
  if (targetUsers.length === 0) {
    return [];
  }
  
  // Create notifications for all target users
  const notifications = targetUsers.map(user => ({
    user_id: user.id,
    title,
    message,
    type: type || 'general',
    related_entity_id: related_entity_id || null,
    related_entity_type: related_entity_type || null,
    is_read: false,
  }));
  
  return exports.createBulkNotifications(notifications);
};
