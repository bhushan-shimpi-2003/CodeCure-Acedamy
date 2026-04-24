const supabase = require('../config/supabaseClient');

/**
 * LiveClass Model — maps to `live_classes`, `recordings`, `attendance`, and `live_messages` tables
 */

// --- Live Classes ---
exports.getLiveClassesByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from('live_classes')
    .select('*, profiles!teacher_id(id, name)')
    .eq('course_id', courseId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.createLiveClass = async (liveClassData) => {
  const { data, error } = await supabase.from('live_classes').insert(liveClassData).select().single();
  if (error) throw error;
  return data;
};

exports.updateLiveClass = async (liveClassId, updates) => {
  const { data, error } = await supabase.from('live_classes').update(updates).eq('id', liveClassId).select().single();
  if (error) throw error;
  return data;
};

exports.deleteLiveClass = async (liveClassId) => {
  const { error } = await supabase.from('live_classes').delete().eq('id', liveClassId);
  if (error) throw error;
  return true;
};

// --- Recordings ---
exports.getRecordingsByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from('recordings')
    .select('*')
    .eq('course_id', courseId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.createRecording = async (recordingData) => {
  const { data, error } = await supabase.from('recordings').insert(recordingData).select().single();
  if (error) throw error;
  return data;
};

// --- Attendance ---
exports.markAttendance = async (attendanceData) => {
  const { data, error } = await supabase.from('attendance').insert(attendanceData).select().single();
  if (error) throw error;
  return data;
};

exports.getAttendanceByLiveClass = async (liveClassId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*, profiles!user_id(id, name, email)')
    .eq('live_class_id', liveClassId);
  if (error) throw error;
  return data;
};

// --- Live Messages ---
exports.sendLiveMessage = async (messageData) => {
  const { data, error } = await supabase.from('live_messages').insert(messageData).select().single();
  if (error) throw error;
  return data;
};

exports.getLiveMessages = async (liveClassId) => {
  const { data, error } = await supabase
    .from('live_messages')
    .select('*, profiles!user_id(id, name, profile_picture)')
    .eq('live_class_id', liveClassId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};
