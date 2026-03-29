import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Calendar, Users, Terminal, Youtube, BookOpen, CheckCircle, GraduationCap, Loader2, FileText, Video, MessageSquare, ArrowRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function Overview({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const { user, token } = useAuth();
  
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

  const activeCoursesCount = enrollments.filter(e => e.student_status === 'active').length;

  const kpis = [
    { label: "My Courses", value: activeCoursesCount, icon: BookOpen, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { label: "Pending Requests", value: requests.filter(r => r.status === 'pending').length, icon: Calendar, color: "bg-amber-50 text-amber-600 border-amber-200" },
    { label: "Available Courses", value: availableCourses.length, icon: Terminal, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { label: "Completed Lessons", value: 12, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600 border-emerald-200" }, // Mock data
  ];

  const quickActions = [
    { label: "Continue Learning", desc: "Watch the latest lectures", icon: Youtube, tab: "lectures", color: "text-red-600 bg-red-50 hover:bg-red-100 border-red-200" },
    { label: "View Assignments", desc: "Check pending homework", icon: FileText, tab: "assignments", color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200" },
    { label: "Career & Interviews", desc: "Prepare for mock interviews", icon: Video, tab: "career", color: "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200" },
    { label: "Ask a Doubt", desc: "Get help from instructors", icon: MessageSquare, tab: "doubts", color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200" },
  ];

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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white border rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${isLoading ? 'animate-pulse' : ''}`}
            >
              <div className={`p-3 sm:p-4 rounded-xl border ${kpi.color}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-500">{kpi.label}</p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 sm:mt-1">
                  {isLoading ? "-" : kpi.value}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" /> Quick Setup & Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                onClick={() => setActiveTab && setActiveTab(action.tab)}
                className={`flex flex-col text-left p-4 sm:p-6 rounded-2xl border transition-all duration-200 group relative overflow-hidden bg-white hover:shadow-md ${action.color.replace('text-', 'border-').split(' ')[0]} border-slate-200`}
              >
                <div className={`absolute -right-2 -bottom-2 opacity-5 transition-transform group-hover:scale-110 group-hover:opacity-10 ${action.color.split(' ')[0]}`}>
                  <Icon className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
                
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border transition-colors ${action.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1 leading-tight sm:leading-normal">{action.label}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-3 sm:mb-4 line-clamp-2 md:line-clamp-none">{action.desc}</p>
                
                <div className="mt-auto flex items-center text-xs sm:text-sm font-bold text-blue-600 sm:group-hover:gap-2 transition-all">
                  <span className="hidden sm:inline">Go to </span><span className="sm:hidden">{action.tab}</span><span className="hidden sm:inline">{action.tab}</span> <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Course Catalog Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6 pt-6 border-t border-slate-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Available Courses</h2>
        </div>
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course: any, i: number) => {
              const status = getEnrollmentStatus(course.id);
              
              return (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors shadow-sm flex flex-col">
                  {course.image_url ? (
                    <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                      <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold rounded-full">
                        {course.duration || "8 Weeks"}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center relative">
                      <Terminal className="w-12 h-12 text-blue-200" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold rounded-full">
                        {course.duration || "8 Weeks"}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">
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
