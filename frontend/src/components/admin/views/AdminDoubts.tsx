import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, LayoutDashboard, Search, Loader2, Eye } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminDoubts() {
  const { token } = useAuth();
  const [doubts, setDoubts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) fetchDoubts();
  }, [token]);

  const fetchDoubts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/doubts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDoubts(data.data);
      }
    } catch (err) {
      console.error("Failed to load doubts", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = doubts.filter((d) => {
    const q = searchQuery.toLowerCase();
    const subjectTitle = d.subject || d.title || d.question || "";
    const studentName = d.student?.name || d.profiles_student?.name || d.student_name || "";
    const teacherName = d.teacher?.name || d.teacher_name || "";
    return (
      subjectTitle.toLowerCase().includes(q) ||
      studentName.toLowerCase().includes(q) ||
      teacherName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4 sm:pt-8 w-full overflow-x-hidden">
      <div className="border-b border-slate-200 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> Doubt Resolution Log
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">&gt; Monitor student doubts and teacher responses.</p>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all shadow-sm">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, teacher, or subject..."
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-300"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No doubts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Student</th>
                  <th className="p-4 font-bold">Subject</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((doubt: any, i: number) => (
                  <motion.tr
                    key={doubt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-xs text-blue-600 font-bold">{(doubt.id || "").slice(0, 8)}</td>
                    <td className="p-4 text-sm text-slate-900 font-bold">{doubt.student?.name || doubt.profiles_student?.name || doubt.student_name || "Student"}</td>
                    <td className="p-4 text-sm text-slate-800">{doubt.subject || doubt.title || doubt.question || "-"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                        doubt.status === 'open'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-slate-900 border-slate-200'
                      }`}>
                        {doubt.status === 'open' ? 'pending' : 'resolved'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500 text-right">{doubt.created_at ? new Date(doubt.created_at).toLocaleDateString() : "-"}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
