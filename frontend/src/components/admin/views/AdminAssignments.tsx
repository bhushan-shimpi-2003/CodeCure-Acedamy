import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileCode2, LayoutDashboard, Search, Loader2, Eye } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminAssignments() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) fetchAssignments();
  }, [token]);

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAssignments(data.data);
      }
    } catch (err) {
      console.error("Failed to load assignments", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = assignments.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      (a.title || "").toLowerCase().includes(q) ||
      (a.course_title || "").toLowerCase().includes(q) ||
      (a.teacher_name || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" /> Assignment Logs
          </h1>
          <p className="text-slate-500 text-sm">&gt; Monitor assignments created by instructors.</p>
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
              placeholder="Search by title, teacher, or course..."
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-300"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No assignments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Course</th>
                  <th className="p-4 font-bold">Due Date</th>
                  <th className="p-4 font-bold text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((asn: any, i: number) => (
                  <motion.tr
                    key={asn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-xs text-blue-600 font-bold">{(asn.id || "").slice(0, 8)}</td>
                    <td className="p-4 text-sm text-slate-900 font-bold">{asn.title}</td>
                    <td className="p-4 text-sm text-slate-800">{asn.course_title || asn.course_id?.slice(0, 8) || "-"}</td>
                    <td className="p-4 text-sm text-slate-500">{asn.due_date ? new Date(asn.due_date).toLocaleDateString() : "No due date"}</td>
                    <td className="p-4 text-sm text-slate-500 text-right">{asn.created_at ? new Date(asn.created_at).toLocaleDateString() : "-"}</td>
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
