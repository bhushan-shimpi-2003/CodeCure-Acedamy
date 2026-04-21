const supabase = require('../config/supabaseClient');

/**
 * @desc    Get teacher dashboard stats
 * @route   GET /api/teacher/dashboard/stats
 * @access  Private (Teacher)
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // 1. Total Students across all teacher's courses
    // Enrollments only have course_id, so we MUST join courses to filter by instructor_id
    const { data: enrollmentData, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('student_id, courses!inner(instructor_id)')
      .eq('courses.instructor_id', teacherId);

    if (enrollmentError) throw enrollmentError;

    const uniqueStudents = new Set(enrollmentData.map(e => e.student_id));
    const total_students = uniqueStudents.size;

    // 2. Efficiency / Top Course (Highest average score)
    // Assignments table has teacher_id, so we can filter directly
    const { data: submissionData, error: submissionError } = await supabase
      .from('assignment_submissions')
      .select('score, assignments!inner(title, course_id, teacher_id)')
      .eq('assignments.teacher_id', teacherId)
      .not('score', 'is', null);

    if (submissionError) throw submissionError;

    // Aggregate average scores per assignment's course (we'll use title for simplicity or fetch course title)
    // For now, let's just use assignment titles to calculate top performing topic
    const courseStats = {};
    submissionData.forEach(s => {
      const topic = s.assignments.title; 
      if (!courseStats[topic]) {
        courseStats[topic] = { total: 0, count: 0 };
      }
      courseStats[topic].total += s.score;
      courseStats[topic].count += 1;
    });

    let top_course = 'No active assignments';
    let avg_score = 0;

    Object.keys(courseStats).forEach(title => {
      const avg = Math.round(courseStats[title].total / courseStats[topic = title].count);
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

    // Combine Doubts and Submissions for activity feed
    // Doubts table has teacher_id
    const { data: doubts, error: doubtsError } = await supabase
      .from('doubts')
      .select('id, title, status, created_at, teacher_id')
      .or(`teacher_id.eq.${teacherId},status.eq.pending`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (doubtsError) throw doubtsError;

    // Fetch recent submissions
    // Assignments has teacher_id
    const { data: submissions, error: submissionsError } = await supabase
      .from('assignment_submissions')
      .select('id, status, submitted_at, assignments!inner(title, teacher_id)')
      .eq('assignments.teacher_id', teacherId)
      .order('submitted_at', { ascending: false })
      .limit(10);

    if (submissionsError) throw submissionsError;

    // Merge and sort
    const activityFeed = [
      ...doubts.map(d => ({
        id: d.id,
        type: 'doubt',
        title: d.title,
        description: d.status === 'resolved' ? 'Resolved student query' : 'New doubt from student',
        status: d.status,
        created_at: d.created_at
      })),
      ...submissions.map(s => ({
        id: s.id,
        type: 'submission',
        title: s.assignments.title,
        description: s.status === 'graded' ? 'Assignment graded' : 'New assignment submission',
        status: s.status,
        created_at: s.submitted_at
      }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);

    const activities = activityFeed.map(item => {
      const diff = new Date() - new Date(item.created_at);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const time_ago = hours === 0 ? 'Just now' : (hours < 24 ? `${hours}h ago` : `${Math.floor(hours/24)}d ago`);

      return {
        ...item,
        time_ago
      };
    });

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('getRecentActivity Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
