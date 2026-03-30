import { API_URL, API_BASE_URL } from '../../../config';
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
      const ps = [fetch(`${API_URL}/courses`)];
      if (token) {
        ps.push(fetch(`${API_URL}/enrollments/me`, { headers: { "Authorization": `Bearer ${token}` } }));
        ps.push(fetch(`${API_URL}/enrollments/requests/me`, { headers: { "Authorization": `Bearer ${token}` } }));
      }
      const rs = await Promise.all(ps);
      const ds = await Promise.all(rs.map(r => r.json()));
      
      if (ds[0].success) setAvailableCourses(ds[0].data);
      if (token) {
        if (ds[1]?.success) setEnrollments(ds[1].data);
        if (ds[2]?.success) setRequests(ds[2].data);
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

  const activeCoursesCount = enrollments.filter(e => e.student_status === 'active').length;

  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);

  useEffect(() => {
    if (user) {
      const key = `completed_lessons_${user.id}`;
      const stored = localStorage.getItem(key);
      const completed = stored ? JSON.parse(stored) : [];
      setCompletedLessonsCount(completed.length);
    }
  }, [user]);

  const kpis = [
    { label: "My Courses", value: activeCoursesCount, icon: BookOpen, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { label: "Pending Requests", value: requests.filter(r => r.status === 'pending').length, icon: Calendar, color: "bg-amber-50 text-amber-600 border-amber-200" },
    { label: "Available Courses", value: availableCourses.length, icon: Terminal, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { label: "Completed Lessons", value: completedLessonsCount, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600 border-emerald-200" }, 
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

    </div>
  );
}
