import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Video, LayoutDashboard, Search, Loader2, CheckSquare } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminInterviews() {
  const { token } = useAuth();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, [token]);

  const fetchInterviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/interviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setInterviews(data.data);
      }
    } catch (err) {
      console.error("Failed to load interviews", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = interviews.filter((iv) => {
    const q = searchQuery.toLowerCase();
    return (
      (iv.student_name || iv.student_email || "").toLowerCase().includes(q) ||
      (iv.teacher_name || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" /> Mock Interviews Log
          </h1>
          <p className="text-slate-500 text-sm">&gt; Monitor scheduled and completed interviews.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 focus-within:border-blue-600 transition-colors">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student or teacher..."
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-300"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No interviews found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Student</th>
                  <th className="p-4 font-bold">Teacher</th>
                  <th className="p-4 font-bold">Date & Time</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((iv: any, i: number) => (
                  <motion.tr
                    key={iv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-xs text-blue-600 font-bold">{(iv.id || "").slice(0, 8)}</td>
                    <td className="p-4 text-sm text-slate-900 font-bold">{iv.student_name || iv.student_email || "Student"}</td>
                    <td className="p-4 text-sm text-slate-800">{iv.teacher_name || "Teacher"}</td>
                    <td className="p-4 text-sm text-slate-500">{iv.scheduled_at ? new Date(iv.scheduled_at).toLocaleString() : "-"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                        iv.status === 'scheduled'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-slate-900 border-slate-200'
                      }`}>
                        {iv.status || "scheduled"}
                      </span>
                    </td>
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
