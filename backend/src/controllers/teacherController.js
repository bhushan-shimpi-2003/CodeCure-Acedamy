const { getPool } = require('../config/db');

/**
 * @desc    Get teacher dashboard stats
 * @route   GET /api/teacher/dashboard/stats
 * @access  Private (Teacher)
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const pool = getPool();

    // 1. Total Students across all teacher's courses
    const studentCountRes = await pool.query(
      `SELECT COUNT(DISTINCT e.user_id) as total_students
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE c.teacher_id = $1 AND e.status = 'approved'`,
      [teacherId]
    );

    // 2. Efficiency / Top Course (Highest average score)
    const topCourseRes = await pool.query(
      `SELECT c.title, AVG(s.score) as avg_score
       FROM assignments a
       JOIN submissions s ON a.id = s.assignment_id
       JOIN courses c ON a.course_id = c.id
       WHERE c.teacher_id = $1
       GROUP BY c.id, c.title
       ORDER BY avg_score DESC
       LIMIT 1`,
      [teacherId]
    );

    const total_students = parseInt(studentCountRes.rows[0]?.total_students || 0);
    const top_course = topCourseRes.rows[0]?.title || 'No active courses';
    const avg_score = Math.round(parseFloat(topCourseRes.rows[0]?.avg_score || 0));

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
    const pool = getPool();

    // Combine Doubts and Submissions for activity feed
    // Limit to 10 most recent
    const activityRes = await pool.query(
      `(SELECT 
          'doubt' as type, 
          d.id, 
          d.title, 
          'New doubt from student' as description, 
          d.created_at
        FROM doubts d
        JOIN courses c ON d.course_id = c.id
        WHERE c.teacher_id = $1 AND d.status = 'pending')
       UNION ALL
       (SELECT 
          'submission' as type, 
          s.id, 
          a.title, 
          'New assignment submission' as description, 
          s.submitted_at as created_at
        FROM submissions s
        JOIN assignments a ON s.assignment_id = a.id
        JOIN courses c ON a.course_id = c.id
        WHERE c.teacher_id = $1 AND s.status = 'pending')
       ORDER BY created_at DESC
       LIMIT 10`,
      [teacherId]
    );

    const activities = activityRes.rows.map(row => {
      const diff = new Date() - new Date(row.created_at);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const time_ago = hours === 0 ? 'Just now' : `${hours}h ago`;

      return {
        id: row.id,
        type: row.type,
        title: row.title,
        description: row.description,
        time_ago: time_ago
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
