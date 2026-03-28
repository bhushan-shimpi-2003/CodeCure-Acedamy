import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Users, BookOpen, Layers, DollarSign, LayoutDashboard, Loader2,
  MessageSquare, Video, FileCode2, AlertCircle, CheckCircle, Clock,
  TrendingUp, UserCheck, GraduationCap, Bell, ArrowUpRight
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

interface PlatformStats {
  students: number;
  teachers: number;
  courses: number;
  publishedCourses: number;
  draftCourses: number;
  enrollments: number;
  activeEnrollments: number;
  pendingRequests: number;
  assignments: number;
  doubtsTotal: number;
  doubtsPending: number;
  doubtsResolved: number;
  interviews: number;
  interviewsScheduled: number;
  interviewsCompleted: number;
  feedbackCount: number;
  openComplaints: number;
  transactions: number;
  totalRevenue: number;
  totalPayouts: number;
}

export default function AdminOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState<PlatformStats>({
    students: 0, teachers: 0, courses: 0, publishedCourses: 0, draftCourses: 0,
    enrollments: 0, activeEnrollments: 0, pendingRequests: 0,
    assignments: 0, doubtsTotal: 0, doubtsPending: 0, doubtsResolved: 0,
    interviews: 0, interviewsScheduled: 0, interviewsCompleted: 0,
    feedbackCount: 0, openComplaints: 0, transactions: 0, totalRevenue: 0, totalPayouts: 0,
  });
  const [recentDoubts, setRecentDoubts] = useState<any[]>([]);
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) fetchAll();
  }, [token]);

  const fetchAll = async () => {
    setIsLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [studentsRes, staffRes, coursesRes, enrollRes, requestsRes, assignRes, doubtsRes, interviewsRes, feedbackRes, txnRes] = await Promise.all([
        fetch(`${API}/admin/students`, { headers }),
        fetch(`${API}/admin/staff`, { headers }),
        fetch(`${API}/courses/admin/all`, { headers }),
        fetch(`${API}/enrollments`, { headers }),
        fetch(`${API}/enrollments/requests/pending`, { headers }),
        fetch(`${API}/assignments`, { headers }),
        fetch(`${API}/doubts`, { headers }),
        fetch(`${API}/interviews`, { headers }),
        fetch(`${API}/admin/feedback`, { headers }),
        fetch(`${API}/admin/transactions`, { headers }),
      ]);

      const [students, staff, courses, enrollments, requests, assignments, doubts, interviews, feedback, txns] = await Promise.all([
        studentsRes.json(), staffRes.json(), coursesRes.json(), enrollRes.json(), requestsRes.json(),
        assignRes.json(), doubtsRes.json(), interviewsRes.json(), feedbackRes.json(), txnRes.json(),
      ]);

      const sData = students.success ? students.data : [];
      const stData = staff.success ? staff.data : [];
      const cData = courses.success ? courses.data : [];
      const eData = enrollments.success ? (enrollments.data || []) : [];
      const rData = requests.success ? (requests.data || []) : [];
      const aData = assignments.success ? (assignments.data || []) : [];
      const dData = doubts.success ? (doubts.data || []) : [];
      const iData = interviews.success ? (interviews.data || []) : [];
      const fData = feedback.success ? (feedback.data || []) : [];
      const tData = txns.success ? (txns.data || []) : [];

      setStats({
        students: sData.length,
        teachers: stData.length,
        courses: cData.length,
        publishedCourses: cData.filter((c: any) => c.status === 'active' || c.status === 'published').length,
        draftCourses: cData.filter((c: any) => c.status === 'draft').length,
        enrollments: eData.length,
        activeEnrollments: eData.filter((e: any) => e.student_status === 'active').length,
        pendingRequests: rData.length,
        assignments: aData.length,
        doubtsTotal: dData.length,
        doubtsPending: dData.filter((d: any) => d.status === 'pending' || d.status === 'open').length,
        doubtsResolved: dData.filter((d: any) => d.status === 'resolved').length,
        interviews: iData.length,
        interviewsScheduled: iData.filter((i: any) => i.status === 'scheduled').length,
        interviewsCompleted: iData.filter((i: any) => i.status === 'completed').length,
        feedbackCount: fData.length,
        openComplaints: fData.filter((f: any) => f.type === 'complaint' && !f.is_resolved).length,
        transactions: tData.length,
        totalRevenue: tData.filter((t: any) => t.type === 'credit').reduce((s: number, t: any) => s + (Number(t.amount) || 0), 0),
        totalPayouts: tData.filter((t: any) => t.type === 'debit').reduce((s: number, t: any) => s + (Number(t.amount) || 0), 0),
      });

      setRecentDoubts(dData.slice(0, 5));
      setRecentEnrollments(eData.slice(0, 5));
    } catch (err) {
      console.error("Failed to load overview", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n}`;
  };

  const formatTime = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-24">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const kpiCards = [
    { label: "Total Students", value: stats.students, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { label: "Staff / Teachers", value: stats.teachers, icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
    { label: "Active Courses", value: stats.publishedCourses, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", sub: `${stats.draftCourses} draft` },
    { label: "Total Enrollments", value: stats.enrollments, icon: GraduationCap, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", sub: `${stats.activeEnrollments} active` },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" /> Platform Overview
        </h1>
        <p className="text-slate-500 text-sm">Real-time platform metrics and activity feed.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white border ${card.border} rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
            >
              <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full ${card.bg} opacity-50 group-hover:opacity-80 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-1.5 rounded-lg ${card.bg}`}>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">{card.label}</div>
                {card.sub && (
                  <div className={`text-[10px] font-bold ${card.color} mt-1`}>{card.sub}</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white border rounded-xl p-5 shadow-sm ${stats.pendingRequests > 0 ? 'border-amber-300' : 'border-slate-200'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Requests</span>
            <Bell className={`w-4 h-4 ${stats.pendingRequests > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className={`text-3xl font-bold ${stats.pendingRequests > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
            {stats.pendingRequests}
          </div>
          <p className="text-xs text-slate-500 mt-2">Enrollment requests awaiting approval</p>
        </motion.div>

        {/* Doubts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doubt Support</span>
            <MessageSquare className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.doubtsTotal}</div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {stats.doubtsPending} pending
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {stats.doubtsResolved} resolved
            </span>
          </div>
        </motion.div>

        {/* Interviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mock Interviews</span>
            <Video className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.interviews}</div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {stats.interviewsScheduled} upcoming
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {stats.interviewsCompleted} done
            </span>
          </div>
        </motion.div>

        {/* Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`bg-white border rounded-xl p-5 shadow-sm ${stats.openComplaints > 0 ? 'border-red-300' : 'border-slate-200'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Feedback & Issues</span>
            <AlertCircle className={`w-4 h-4 ${stats.openComplaints > 0 ? 'text-red-500' : 'text-slate-400'}`} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.feedbackCount}</div>
          <div className="flex items-center gap-4 mt-2">
            {stats.openComplaints > 0 ? (
              <span className="text-xs font-bold text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" /> {stats.openComplaints} open complaints
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> All resolved
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Recent Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Doubts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" /> Recent Doubts
            </h2>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {stats.doubtsPending} UNRESOLVED
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {recentDoubts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No doubts yet</div>
            ) : (
              recentDoubts.map((d: any) => (
                <div key={d.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{d.subject || d.title || "Untitled"}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{d.student_name || "Student"} · {formatTime(d.created_at)}</p>
                  </div>
                  <span className={`ml-3 px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${
                    (d.status === 'pending' || d.status === 'open')
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {d.status === 'pending' || d.status === 'open' ? 'PENDING' : 'RESOLVED'}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-violet-600" /> Recent Enrollments
            </h2>
            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
              {stats.enrollments} TOTAL
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {recentEnrollments.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No enrollments yet</div>
            ) : (
              recentEnrollments.map((e: any) => (
                <div key={e.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{e.student_name || e.student_id?.slice(0, 8) || "Student"}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Course: {e.course_title || e.course_id?.slice(0, 8) || "-"} · {formatTime(e.enrolled_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      e.payment_status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {(e.payment_status || 'pending').toUpperCase()}
                    </span>
                    {e.amount_paid > 0 && (
                      <span className="text-xs font-bold text-slate-700">₹{Number(e.amount_paid).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Platform Health</h3>
            <p className="text-blue-100 text-sm mt-1">
              {stats.courses} courses · {stats.assignments} assignments · {stats.transactions} transactions recorded
            </p>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.students + stats.teachers}</div>
              <div className="text-[11px] text-blue-200 font-semibold">Total Users</div>
            </div>
            <div className="w-px h-8 bg-white/20 hidden md:block"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue - stats.totalPayouts)}</div>
              <div className="text-[11px] text-blue-200 font-semibold">Net Revenue</div>
            </div>
            <div className="w-px h-8 bg-white/20 hidden md:block"></div>
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center gap-1">
                {stats.doubtsTotal > 0 ? Math.round((stats.doubtsResolved / stats.doubtsTotal) * 100) : 100}%
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="text-[11px] text-blue-200 font-semibold">Resolution Rate</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
