import { motion } from "motion/react";
import { MessageSquare, CheckCircle, Clock, Terminal } from "lucide-react";

export default function TeacherDoubts() {
  const doubts = [
    { id: "DBT_01", student: "Alex Developer", question: "How to handle iframes in Playwright?", time: "10 mins ago", status: "unresolved" },
    { id: "DBT_02", student: "Sarah Connor", question: "Difference between locator.click() and page.click()?", time: "1 hour ago", status: "unresolved" },
    { id: "DBT_03", student: "John Smith", question: "Setup teardown hooks not working.", time: "Yesterday", status: "resolved" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Doubt_Support
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Student questions and discussion threads.</p>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6">
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Active_Threads
        </h2>
        
        <div className="space-y-4">
          {doubts.map((doubt, i) => (
            <motion.div 
              key={doubt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 border ${doubt.status === 'unresolved' ? 'bg-amber-950/10 border-amber-500/30' : 'bg-[#050505] border-emerald-900/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">{doubt.student}</span>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {doubt.time}</span>
                </div>
                <span className={`px-2 py-0.5 text-[8px] font-bold uppercase border ${doubt.status === 'unresolved' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                  {doubt.status}
                </span>
              </div>
              <p className="text-sm text-white mb-4">"{doubt.question}"</p>
              
              {doubt.status === 'unresolved' ? (
                <div className="flex gap-2">
                  <input type="text" placeholder="Type response..." className="flex-1 bg-[#050505] border border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-400 outline-none focus:border-emerald-500" />
                  <button className="bg-emerald-500 text-black hover:bg-emerald-400 px-4 py-1.5 text-xs font-bold uppercase transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    Reply
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold uppercase">
                  <CheckCircle className="w-3.5 h-3.5" /> Resolved
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
