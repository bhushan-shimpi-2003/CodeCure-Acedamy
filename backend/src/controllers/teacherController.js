const supabase = require('../config/supabaseClient');

/**
 * @desc    Get teacher dashboard stats
 * @route   GET /api/teacher/dashboard/stats
 * @access  Private (Teacher)
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // 1. Total Students
    const { data: enrollmentData, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('student_id, courses:course_id!inner(instructor_id)')
      .eq('courses.instructor_id', teacherId);

    if (enrollmentError) throw enrollmentError;

    // Use a Set to count unique students across all courses taught by this teacher
    const uniqueStudents = new Set((enrollmentData || []).map(e => e.student_id));
    const total_students = uniqueStudents.size;

    // 2. Efficiency (based on graded assignments)
    const { data: submissionData, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select('score, assignments:assignment_id!inner(title, teacher_id)')
      .eq('assignments.teacher_id', teacherId)
      .not('score', 'is', null);

    if (submissionError) throw submissionError;

    const courseStats = {};
    submissionData.forEach(s => {
      if (!s.assignments) return;
      const topic = s.assignments.title; 
      if (!courseStats[topic]) {
        courseStats[topic] = { total: 0, count: 0 };
      }
      const score = parseFloat(s.score) || 0;
      courseStats[topic].total += score;
      courseStats[topic].count += 1;
    });

    let top_course = 'No active assignments';
    let avg_score = 0;

    Object.keys(courseStats).forEach(title => {
      const avg = Math.round(courseStats[title].total / courseStats[title].count);
      if (avg > avg_score) {
        avg_score = avg;
        top_course = title;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        total_students,
        top_course,
        avg_score,
        efficiency_note: total_students > 0 
          ? `Your students are performing well with an average score of ${avg_score}% across your curriculum.`
          : "Start by creating a course and enrolling students to see efficiency metrics.",
      }
    });
  } catch (error) {
    console.error('getDashboardStats Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Get recent activities (submissions, doubts, etc)
 * @route   GET /api/teacher/dashboard/activity
 * @access  Private (Teacher)
 */
exports.getRecentActivity = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Fetch Doubts assigned to teacher OR unassigned (pending)
    const { data: doubts, error: doubtsError } = await supabase
      .from('doubts')
      .select('id, title, status, created_at')
      .or(`teacher_id.eq.${teacherId},status.eq.pending`)
      .order('created_at', { ascending: false })
      .limit(15);

    if (doubtsError) throw doubtsError;

    // Fetch Submissions for assignments created by this teacher
    const { data: submissions, error: submissionsError } = await supabase
      .from('assignment_submissions')
      .select('id, status, submitted_at, assignments!inner(title, teacher_id)')
      .eq('assignments.teacher_id', teacherId)
      .order('submitted_at', { ascending: false })
      .limit(15);

    if (submissionsError) throw submissionsError;

    // Process Activity Feed
    const doubtActivities = (doubts || []).map(d => ({
      id: d.id,
      type: 'doubt',
      title: d.title || 'Student Doubt',
      description: d.status === 'resolved' ? 'Resolved student query' : 'New doubt from student',
      status: d.status,
      created_at: d.created_at || new Date().toISOString()
    }));

    const submissionActivities = (submissions || [])
      .filter(s => s.assignments)
      .map(s => ({
        id: s.id,
        type: 'submission',
        title: s.assignments.title || 'Assignment Submission',
        description: s.status === 'graded' ? 'Assignment graded' : 'New assignment submission',
        status: s.status,
        created_at: s.submitted_at || new Date().toISOString()
      }));

    const activities = [...doubtActivities, ...submissionActivities]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(item => {
        const diff = new Date().getTime() - new Date(item.created_at).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        let time_ago = 'Just now';
        if (hours > 0 && hours < 24) time_ago = `${hours}h ago`;
        else if (hours >= 24) time_ago = `${Math.floor(hours / 24)}d ago`;

        return { ...item, time_ago };
      });

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('getRecentActivity Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', details: error.message });
  }
};

/**
 * @desc    Get students enrolled in a specific course (for teacher)
 * @route   GET /api/teacher/course/:courseId/students
 * @access  Private (Teacher)
 */
exports.getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { data, error } = await supabase
      .from('enrollments')
      .select('student_id, student_status, profiles!student_id(id, name, email, profile_picture)')
      .eq('course_id', courseId)
      .eq('student_status', 'active');

    if (error) throw error;

    const students = data.map(item => ({
      ...item.profiles,
      status: item.student_status
    })).filter(s => s.id);

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('getCourseStudents Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
