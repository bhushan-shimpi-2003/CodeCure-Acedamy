import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Terminal, Send, Search } from "lucide-react";

export default function StudentDoubts() {
  const [doubtText, setDoubtText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const doubts = [
    { id: "DBT_01", text: "How does the event loop work in Node.js?", status: "resolved", reply: "The event loop is what allows Node.js to perform non-blocking I/O operations..." },
    { id: "DBT_02", text: "Can someone explain Playwright fixtures?", status: "pending", reply: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Doubt submitted successfully! A teacher will respond soon.");
      setDoubtText("");
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Doubt_Support
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Ask questions and get help from instructors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            
            <h2 className="text-sm font-bold text-emerald-500 mb-4 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Ask_A_Doubt
            </h2>

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase">
                &gt; {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea 
                  required
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  rows={5}
                  className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors resize-none text-sm"
                  placeholder="Describe your doubt in detail..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-3 rounded-none font-bold uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-current" /> Submit_Doubt
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
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
          >
            <div className="flex items-center justify-between mb-6 border-b border-emerald-500/20 pb-2">
              <h2 className="text-sm font-bold text-emerald-500 uppercase flex items-center gap-2">
                <Search className="w-4 h-4" /> My_Doubts
              </h2>
            </div>
            
            <div className="space-y-4">
              {doubts.map((doubt, i) => (
                <div key={doubt.id} className="bg-[#050505] border border-emerald-900/50 p-4 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase">{doubt.id}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      doubt.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {doubt.status}
                    </span>
                  </div>
                  <p className="text-sm text-white mb-3">{doubt.text}</p>
                  
                  {doubt.reply && (
                    <div className="mt-3 pt-3 border-t border-emerald-900/50 bg-emerald-950/10 p-3">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-1">Instructor_Reply:</span>
                      <p className="text-xs text-emerald-200">{doubt.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
