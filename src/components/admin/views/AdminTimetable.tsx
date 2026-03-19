import { motion } from "motion/react";
import { Calendar, AlertTriangle, Plus, Terminal, RefreshCw } from "lucide-react";

export default function AdminTimetable() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Timetable_Ctrl
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Manage schedules and resolve conflicts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#050505] border border-emerald-500 text-emerald-500 px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-900/30 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Auto_Generate
          </button>
          <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-2">
            <Plus className="w-4 h-4" /> Schedule_Class
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-950/20 border border-red-500/50 rounded-none p-4 flex items-start gap-3"
      >
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-red-400 uppercase">SYS_CONFLICT_DETECTED</h3>
          <p className="text-xs text-red-500/80 mt-1">Instructor Rahul Shetty is double-booked on Thursday 20:00 IST (Batch 4 & Batch 5).</p>
          <button className="mt-2 text-xs font-bold text-red-400 border-b border-red-400/30 hover:border-red-400 uppercase">Resolve_Conflict</button>
        </div>
      </motion.div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-emerald-500/30 text-emerald-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-bold w-24">Time</th>
              <th className="p-4 font-bold">Monday</th>
              <th className="p-4 font-bold">Tuesday</th>
              <th className="p-4 font-bold">Wednesday</th>
              <th className="p-4 font-bold">Thursday</th>
              <th className="p-4 font-bold">Friday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/30">
            {['09:00', '11:00', '14:00', '16:00', '20:00'].map((time, i) => (
              <tr key={time} className="hover:bg-emerald-950/10 transition-colors">
                <td className="p-4 text-xs text-emerald-500 font-bold">{time}</td>
                {[1, 2, 3, 4, 5].map((day) => (
                  <td key={day} className="p-2">
                    {Math.random() > 0.6 ? (
                      <div className={`p-2 border ${i === 4 && day === 4 ? 'bg-red-950/30 border-red-500/50' : 'bg-[#050505] border-emerald-900/50 hover:border-emerald-500/50'} transition-colors cursor-pointer`}>
                        <div className={`text-xs font-bold uppercase ${i === 4 && day === 4 ? 'text-red-400' : 'text-emerald-400'}`}>Playwright</div>
                        <div className="text-[10px] text-emerald-600">Batch {day} • Rahul S.</div>
                      </div>
                    ) : (
                      <div className="p-2 border border-transparent hover:border-emerald-900/30 transition-colors cursor-pointer h-12"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
