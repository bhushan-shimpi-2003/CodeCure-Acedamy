import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Send, Search, HelpCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function StudentDoubts() {
  const { token } = useAuth();
  const [doubtText, setDoubtText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [doubts, setDoubts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoubts = async () => {
      setIsLoading(true);
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/doubts/me", {
          headers: { "Authorization": `Bearer ${token}` }
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
    fetchDoubts();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/doubts", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: doubtText })
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccessMessage("Doubt submitted successfully! A teacher will respond soon.");
        setDoubtText("");
        setDoubts([data.data, ...doubts]); // Add new doubt to top
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        alert("Failed to submit doubt.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting doubt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" /> Doubt Support
        </h1>
        <p className="text-slate-500 text-sm">Ask questions and get help from instructors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Ask A Doubt
            </h2>

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-lg">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea 
                  required
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 text-slate-900 outline-none transition-colors resize-none text-sm"
                  placeholder="Describe your doubt in detail..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !doubtText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Doubt
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" /> My Doubts
              </h2>
            </div>
            
            <div className="space-y-4">
              {doubts.length === 0 ? (
                <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm shadow-inner">
                  You haven't asked any doubts yet.
                </div>
              ) : (
                doubts.map((doubt) => (
                  <div key={doubt.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(doubt.created_at).toLocaleDateString()}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        doubt.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {doubt.status ? doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1) : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-900 font-medium mb-4">{doubt.text}</p>
                    
                    {doubt.reply && (
                      <div className="mt-4 pt-4 border-t border-slate-200 bg-white rounded-lg p-4 border shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-blue-600">Instructor Reply:</span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {doubt.resolved_at ? new Date(doubt.resolved_at).toLocaleDateString() : ""}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{doubt.reply}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
