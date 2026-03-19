import { motion } from "motion/react";
import { FileCode2, UploadCloud, CheckSquare, Clock, Terminal } from "lucide-react";

export default function Assignments() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Tasks_&_Assignments
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Apply knowledge through practical execution.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-2 uppercase border-b border-emerald-500/20 pb-2">
          <FileCode2 className="w-4 h-4" /> Module_Assignments
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: "JS Array Methods Practice", status: "graded", score: "9.5/10", due: "Past Due" },
            { title: "First Playwright Script", status: "submitted", score: "Pending", due: "Past Due" },
            { title: "Complex Locators Challenge", status: "pending", score: "-", due: "Tomorrow, 11:59 PM" },
            { title: "API Mocking Task", status: "locked", score: "-", due: "Next Week" },
          ].map((task, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-5 hover:border-emerald-400 transition-colors relative"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500/20"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <h3 className="font-bold text-white uppercase text-sm">{task.title}</h3>
                {task.status === 'graded' && <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase">Graded</span>}
                {task.status === 'submitted' && <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/30 uppercase">Submitted</span>}
                {task.status === 'pending' && <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30 uppercase">Action_Req</span>}
                {task.status === 'locked' && <span className="px-2 py-0.5 bg-[#111] text-emerald-800 text-[10px] font-bold border border-emerald-900 uppercase">Locked</span>}
              </div>
              
              <div className="flex items-center justify-between text-xs font-bold pl-2">
                <div className="flex items-center gap-4 text-emerald-600">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {task.due}</span>
                  <span className="flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /> SCORE: {task.score}</span>
                </div>
                
                {task.status === 'pending' && (
                  <button className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 uppercase border-b border-emerald-400/30 hover:border-emerald-300 pb-0.5">
                    <UploadCloud className="w-3.5 h-3.5" /> Submit
                  </button>
                )}
                {task.status === 'graded' && (
                  <button className="text-emerald-600 hover:text-emerald-400 flex items-center gap-1.5 uppercase border-b border-emerald-600/30 hover:border-emerald-400 pb-0.5">
                    View_Log
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
