import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, CheckCircle, Clock, GraduationCap, Loader2, Send } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherDoubts() {
  const { token } = useAuth();
  const [doubts, setDoubts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [isReplying, setIsReplying] = useState<string | null>(null);

  useEffect(() => {
    fetchDoubts();
  }, [token]);

  const fetchDoubts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/doubts/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDoubts(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch doubts", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (doubtId: string) => {
    const reply = replyText[doubtId];
    if (!reply?.trim()) return;
    setIsReplying(doubtId);

    try {
      const res = await fetch(`${API}/doubts/${doubtId}/resolve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh doubts
        fetchDoubts();
        setReplyText((prev) => ({ ...prev, [doubtId]: "" }));
      }
    } catch (err) {
      console.error("Failed to reply", err);
    } finally {
      setIsReplying(null);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" /> Doubt Support
        </h1>
        <p className="text-slate-500 text-sm">Student questions and discussion threads.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Active Threads
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : doubts.length === 0 ? (
          <div className="text-center p-12 text-slate-500">
            No student doubts yet. They'll appear here when students ask questions.
          </div>
        ) : (
          <div className="space-y-4">
            {doubts.map((doubt: any, i: number) => (
              <motion.div 
                key={doubt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 border rounded-xl ${doubt.status === 'open' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">{doubt.student_name || 'Student'}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {formatTime(doubt.created_at)}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg border ${
                    doubt.status === 'open' 
                      ? 'bg-amber-100 text-amber-700 border-amber-200' 
                      : 'bg-green-100 text-green-700 border-green-200'
                  }`}>
                    {doubt.status === 'open' ? 'unresolved' : 'resolved'}
                  </span>
                </div>
                <p className="text-slate-700 mb-2 font-semibold">"{doubt.title || doubt.question}"</p>
                {doubt.description && (
                  <p className="text-slate-500 text-sm mb-4">{doubt.description}</p>
                )}
                
                {doubt.status === 'open' ? (
                  <div className="flex gap-3 mt-4">
                    <input 
                      type="text" 
                      placeholder="Type response..." 
                      value={replyText[doubt.id] || ""}
                      onChange={(e) => setReplyText((prev) => ({ ...prev, [doubt.id]: e.target.value }))}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" 
                    />
                    <button 
                      onClick={() => handleReply(doubt.id)}
                      disabled={isReplying === doubt.id}
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-5 py-2 text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                    >
                      {isReplying === doubt.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Reply
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    {doubt.reply && (
                      <div className="bg-white border border-green-100 rounded-xl p-3 mb-2">
                        <p className="text-sm text-slate-700"><span className="font-semibold text-green-700">Reply:</span> {doubt.reply}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-green-600 font-bold bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
                      <CheckCircle className="w-4 h-4" /> Resolved
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
