import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, BookOpen, Layers, DollarSign, Target, LayoutDashboard, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ students: 0, courses: 0, staff: 0, enrollments: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      const [studentsRes, coursesRes, staffRes, enrollRes] = await Promise.all([
        fetch(`${API}/admin/students`, { headers }),
        fetch(`${API}/courses/admin/all`, { headers }),
        fetch(`${API}/admin/staff`, { headers }),
        fetch(`${API}/enrollments`, { headers }),
      ]);

      const [studentsData, coursesData, staffData, enrollData] = await Promise.all([
        studentsRes.json(),
        coursesRes.json(),
        staffRes.json(),
        enrollRes.json(),
      ]);

      setStats({
        students: studentsData.success ? studentsData.data.length : 0,
        courses: coursesData.success ? coursesData.data.length : 0,
        staff: staffData.success ? staffData.data.length : 0,
        enrollments: enrollData.success ? (enrollData.data?.length || enrollData.count || 0) : 0,
      });
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { label: "Total Students", value: stats.students, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Courses", value: stats.courses, icon: BookOpen, color: "text-green-600", bg: "bg-green-50" },
    { label: "Staff / Teachers", value: stats.staff, icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Enrollments", value: stats.enrollments, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" /> Platform Overview
        </h1>
        <p className="text-slate-500 text-sm">Global platform metrics and performance indicators.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
