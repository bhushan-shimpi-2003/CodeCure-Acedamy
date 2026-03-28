import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Star, AlertCircle, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminFeedback() {
  const { token } = useAuth();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) fetchFeedback();
  }, [token]);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/admin/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (err) {
      console.error("Failed to load feedback", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      const res = await fetch(`${API}/admin/feedback/${id}/resolve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchFeedback();
    } catch (err) {
      console.error("Failed to resolve", err);
    }
  };

  const complaints = feedbacks.filter(f => f.type === 'complaint' && f.status !== 'resolved');
  const avgRating = feedbacks.filter(f => f.rating).length > 0
    ? (feedbacks.filter(f => f.rating).reduce((sum, f) => sum + f.rating, 0) / feedbacks.filter(f => f.rating).length).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-600" /> Feedback Data
        </h1>
        <p className="text-slate-500 text-sm">&gt; Teacher ratings, student feedback, complaints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-slate-900 mb-2">{avgRating}/5</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating) || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
            ))}
          </div>
          <div className="text-[10px] font-bold text-slate-500">Avg Rating</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-slate-900 mb-2">{feedbacks.length}</div>
          <div className="text-[10px] font-bold text-slate-500 mt-6">Total Feedback</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-red-600 mb-2">{complaints.length}</div>
          <div className="text-[10px] font-bold text-red-600 mt-6">Open Complaints</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-xl p-6"
      >
        <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2">Recent Logs</h2>
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No feedback yet.</div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb: any) => (
              <div key={fb.id} className={`p-4 border ${fb.type === 'complaint' && fb.status !== 'resolved' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {fb.type === 'complaint' ? <AlertCircle className="w-4 h-4 text-red-600" /> : <MessageSquare className="w-4 h-4 text-blue-600" />}
                    <span className={`text-xs font-bold ${fb.type === 'complaint' ? 'text-red-600' : 'text-slate-900'}`}>[{fb.type || 'feedback'}]</span>
                    <span className="text-xs text-slate-500">from {fb.student_name || 'Student'}</span>
                  </div>
                  {fb.rating && (
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-3 h-3 ${idx < fb.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-800">"{fb.comment || fb.message || '-'}"</p>
                {fb.type === 'complaint' && fb.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolve(fb.id)}
                    className="mt-3 text-[10px] font-bold text-red-600 border border-red-200 px-3 py-1 hover:bg-red-100 transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
