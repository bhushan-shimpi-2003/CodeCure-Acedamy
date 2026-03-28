const supabase = require('../config/supabaseClient');

/**
 * Assignment Model — maps to `assignments` + `assignment_submissions` tables
 * Source: Assignments.tsx (student: title, status, score, due),
 *         TeacherAssignments.tsx (create: title, description, due_date),
 *         AdminAssignments.tsx (log: id, title, teacher, course, submissions count)
 */

// --- Assignments ---
exports.getAssignmentsByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from('assignments')
    .select('*, profiles!teacher_id(id, name)')
    .eq('course_id', courseId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getAllAssignments = async () => {
  const { data, error } = await supabase
    .from('assignments')
    .select('*, profiles!teacher_id(id, name), courses(id, title)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.createAssignment = async (assignmentData) => {
  const { data, error } = await supabase.from('assignments').insert(assignmentData).select().single();
  if (error) throw error;
  return data;
};

exports.deleteAssignment = async (assignmentId) => {
  const { error } = await supabase.from('assignments').delete().eq('id', assignmentId);
  if (error) throw error;
  return true;
};

// --- Submissions ---
exports.getSubmissionsByStudent = async (studentId) => {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .select('*, assignments(id, title, due_date, courses(id, title))')
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getSubmissionsByAssignment = async (assignmentId) => {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .select('*, profiles!student_id(id, name, email)')
    .eq('assignment_id', assignmentId)
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.submitAssignment = async (submissionData) => {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .insert({ ...submissionData, submitted_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
};

exports.gradeSubmission = async (submissionId, score, feedback) => {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .update({ status: 'graded', score, feedback, graded_at: new Date().toISOString() })
    .eq('id', submissionId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
