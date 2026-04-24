import { API_URL, API_BASE_URL } from '../../../config';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, GraduationCap, Loader2, CheckCircle, BookOpen } from "lucide-react";
import { useAuth } from "../../../context/useAuth";

export default function AvailableCourses() {
  const { token } = useAuth();
  
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch all public courses
      const coursesRes = await fetch(`${API_URL}/courses`);
      const coursesData = await coursesRes.json();
      if (coursesData.success) {
        setAvailableCourses(coursesData.data);
      }

      // Fetch my enrollments and requests
      if (token) {
        const enrollRes = await fetch(`${API_URL}/enrollments/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        if (enrollData.success) {
          setEnrollments(enrollData.data);
        }

        const reqRes = await fetch(`${API_URL}/enrollments/requests/me`, {
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
    fetchDashboardData();
  }, [token]);

  const handleRequestEnrollment = async (courseId: string) => {
    setIsRequesting(courseId);
    try {
      const res = await fetch(`${API_URL}/enrollments/request`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ course_id: courseId }),
      });
      const data = await res.json();
      if (data.success) {
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

  const getEnrollmentStatus = (courseId: string) => {
    const enrollment = enrollments.find(e => e.course_id === courseId);
    if (enrollment) return enrollment.student_status; 
    
    const request = requests.find(r => r.course_id === courseId && r.status === 'pending');
    if (request) return 'pending';

    return null;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Course Catalog
        </h1>
        <p className="text-slate-500 text-sm">Browse and request enrollment for new courses.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : availableCourses.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">No Courses Available</h3>
            <p className="text-slate-500 max-w-sm mx-auto">There are currently no public courses available. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course: any) => {
              const status = getEnrollmentStatus(course.id);
              
              return (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors shadow-sm flex flex-col">
                  {course.thumbnail ? (
                    <div className="w-full h-52 overflow-hidden relative">
                      <img 
                        src={(typeof course.thumbnail === 'string' && course.thumbnail.startsWith('http')) ? course.thumbnail : (typeof course.thumbnail === 'string' && !course.thumbnail.includes('[object Object]')) ? `${API_BASE_URL}/uploads/${course.thumbnail}` : course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold rounded-full">
                        {course.duration || "8 Weeks"}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center relative">
                      <Terminal className="w-12 h-12 text-blue-200" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold rounded-full">
                        {course.duration || "8 Weeks"}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">
                      {course.description || "Master the fundamentals and advanced concepts in this comprehensive course."}
                    </p>
                    
                    <div className="mt-auto">
                      {status === 'active' ? (
                        <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Enrolled
                        </button>
                      ) : status === 'pending' ? (
                        <button disabled className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Request Pending
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleRequestEnrollment(course.id)}
                          disabled={isRequesting === course.id}
                          className="w-full py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          {isRequesting === course.id ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Requesting...</>
                          ) : (
                            "Request Access"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
