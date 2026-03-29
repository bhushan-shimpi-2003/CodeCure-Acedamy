import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Calendar, Users, Terminal, Youtube, BookOpen, CheckCircle, GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function Overview() {
  const { user, token } = useAuth();
  const [featuredVideoId, setFeaturedVideoId] = useState<string | null>(null);
  
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch all public courses
      const coursesRes = await fetch("http://localhost:5000/api/courses");
      const coursesData = await coursesRes.json();
      if (coursesData.success) {
        setAvailableCourses(coursesData.data);
      }

      // Fetch my enrollments and requests
      if (token) {
        const enrollRes = await fetch("http://localhost:5000/api/enrollments/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        if (enrollData.success) {
          setEnrollments(enrollData.data);
        }

        const reqRes = await fetch("http://localhost:5000/api/enrollments/requests/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const reqData = await reqRes.json();
        if (reqData.success) {
          setRequests(reqData.data);
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedLink = localStorage.getItem("sharedYoutubeLink");
    if (savedLink) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = savedLink.match(regExp);
      if (match && match[2].length === 11) {
        setFeaturedVideoId(match[2]);
      }
    }

    fetchDashboardData();
  }, [token]);

  const handleRequestEnrollment = async (courseId: string) => {
    setIsRequesting(courseId);
    try {
      const res = await fetch("http://localhost:5000/api/enrollments/request", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ course_id: courseId }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh enrollments to show pending
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to request enrollment");
      }
    } catch (err) {
      console.error(err);
      alert("Error requesting enrollment");
    } finally {
      setIsRequesting(null);
    }
  };

  // Helper to check enrollment status
  const getEnrollmentStatus = (courseId: string) => {
    const enrollment = enrollments.find(e => e.course_id === courseId);
    if (enrollment) {
      // Return student_status ('active', 'completed', 'cancelled')
      return enrollment.student_status; 
    }
    
    // If not enrolled, check if there's a pending request
    const request = requests.find(r => r.course_id === courseId && r.status === 'pending');
    if (request) {
      return 'pending';
    }

    return null;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."<br/>
              Ready to continue your journey?
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl min-w-[240px]">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-medium text-slate-500">Overall Progress</span>
              <span className="text-2xl font-bold text-blue-600">42%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-blue-600 h-2.5 rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Catalog Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Course Catalog</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : availableCourses.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 text-slate-500">
            No courses available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course, i) => {
              const status = getEnrollmentStatus(course.id);

              return (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded-xl overflow-hidden shadow-sm border border-blue-100/50">
                        {course.thumbnail_url ? (
                          <img src={course.thumbnail_url} alt={course.title} className="w-8 h-8 object-cover rounded" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{course.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">
                      {course.description || `Master the concepts of ${course.title} with our comprehensive video lectures, assignments, and real-world projects.`}
                    </p>
                  </div>
                  
                  {status === 'active' || status === 'completed' ? (
                    <div className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" /> {status === 'completed' ? 'Completed' : 'Enrolled'}
                    </div>
                  ) : status === 'pending' ? (
                    <div className="flex items-center justify-center gap-2 w-full py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" /> Request Pending
                    </div>
                  ) : status === 'cancelled' ? (
                    <div className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-700 rounded-xl text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" /> Enrollment Cancelled
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRequestEnrollment(course.id)}
                      disabled={isRequesting === course.id}
                      className="w-full py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 rounded-xl transition-all text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isRequesting === course.id ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Request Enrollment
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
