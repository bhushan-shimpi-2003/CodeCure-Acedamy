import { API_URL, API_BASE_URL } from '../../../config';
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle, 
  Youtube, 
  FileText, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Video, 
  MessageSquare,
  ArrowRight,
  GraduationCap,
  FileCode2
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = API_URL;

export default function TeacherOverview({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const { token, user } = useAuth();
  
  // KPI States
  const [coursesCount, setCoursesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [interviewsCount, setInterviewsCount] = useState(0);
  const [pendingDoubtsCount, setPendingDoubtsCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchAllMetrics();
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch(`${API}/teacher/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/teacher/dashboard/activity`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const statsData = await statsRes.json();
      const activityData = await activityRes.json();

      if (statsData.success) {
        setStats(statsData.data);
        setStudentsCount(statsData.data.total_students);
      }
      if (activityData.success) {
        setRecentActivity(activityData.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  const fetchAllMetrics = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch courses
      const coursesRes = await fetch(`${API}/courses/teacher/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const coursesData = await coursesRes.json();
      if (coursesData.success) {
        setCoursesCount(coursesData.data.length);
      }

      // 2. Fetch Active Students (from enrollments)
      const enrollRes = await fetch(`${API}/enrollments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const enrollData = await enrollRes.json();
      if (enrollData.success) {
        // Teacher has access to matching enrollments 
        const activeCount = enrollData.data.filter((e: any) => e.student_status === 'active').length;
        setStudentsCount(activeCount);
      }

      // 3. Fetch Interviews
      const interviewsRes = await fetch(`${API}/interviews/teacher`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const interviewsData = await interviewsRes.json();
      if (interviewsData.success) {
        setInterviewsCount(interviewsData.data.filter((i: any) => i.status === 'scheduled').length);
      }

      // 4. Fetch Doubts
      const doubtsRes = await fetch(`${API}/doubts/teacher`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const doubtsData = await doubtsRes.json();
      if (doubtsData.success) {
        setPendingDoubtsCount(doubtsData.data.filter((d: any) => d.status === 'pending').length);
      }

    } catch (err) {
      console.error("Failed to load KPIs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const kpis = [
    { label: "Active Courses", value: coursesCount, icon: BookOpen, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { label: "Enrolled Students", value: studentsCount, icon: Users, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { label: "Upcoming Interviews", value: interviewsCount, icon: Video, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { label: "Pending Doubts", value: pendingDoubtsCount, icon: MessageSquare, color: "bg-amber-50 text-amber-600 border-amber-200" },
  ];

  const quickActions = [
    { label: "Publish New Lecture", desc: "Upload Youtube video links", icon: Youtube, tab: "publish", color: "text-red-600 bg-red-50 hover:bg-red-100 border-red-200" },
    { label: "Schedule Interview", desc: "Set up Google Meet sessions", icon: Video, tab: "interviews", color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200" },
    { label: "Distribute Assignment", desc: "Test your students' knowledge", icon: FileCode2, tab: "assignments", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
    { label: "Resolve Doubts", desc: "Reply to student questions", icon: MessageSquare, tab: "doubts", color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" /> Instructor Dashboard
        </h1>
        <p className="text-slate-500 text-sm">Welcome back, {user?.name || 'Instructor'}. Here is what's happening today.</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Quick Actions Panel */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  onClick={() => setActiveTab && setActiveTab(action.tab)}
                  className={`flex flex-col text-left p-4 sm:p-6 rounded-2xl border transition-all duration-200 group relative overflow-hidden bg-white hover:shadow-md ${action.color.replace('text-', 'border-').split(' ')[0]} border-slate-200`}
                >
                  <div className={`absolute -right-4 -bottom-4 opacity-5 transition-transform group-hover:scale-110 group-hover:opacity-10 ${action.color.split(' ')[0]}`}>
                    <Icon className="w-24 h-24 sm:w-32 sm:h-32" />
                  </div>
                  
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border transition-colors ${action.color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1 leading-tight sm:leading-normal">{action.label}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{action.desc}</p>
                  
                  <div className="mt-auto flex items-center text-xs sm:text-sm font-bold text-blue-600 sm:group-hover:gap-2 transition-all">
                    <span className="hidden sm:inline">Go to </span><span className="sm:hidden">{action.tab}</span><span className="hidden sm:inline">{action.tab}</span> <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Info panel / Getting started */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Teaching Guide
          </h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-300" /> Workflow Tips</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-200">
              <li className="flex gap-3 items-start">
                <span className="bg-blue-500/30 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-blue-400/30 text-xs mt-0.5">1</span>
                <span>Record a new video explanation and upload it to YouTube (Unlisted).</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-blue-500/30 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-blue-400/30 text-xs mt-0.5">2</span>
                <span>Use the <strong>Publish Lecture</strong> tool to distribute it to students enrolled in your active courses.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-blue-500/30 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-blue-400/30 text-xs mt-0.5">3</span>
                <span>Check back for student doubts under the <strong>Doubt Support</strong> tab to ensure high engagement.</span>
              </li>
            </ul>
          </motion.div>

          {/* Recent Activity Feed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className={`p-2 rounded-lg ${activity.type === 'doubt' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                      {activity.type === 'doubt' ? <MessageSquare className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{activity.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{activity.description}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wider">{activity.time_ago}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400">No recent activity found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
