import { motion } from "motion/react";
import { Calendar, Clock, RefreshCw, Terminal } from "lucide-react";

export default function TeacherTimetable() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Timetable_View
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Weekly schedule and class rescheduling.</p>
        </div>
        <button className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-4 py-2 rounded-none text-xs font-bold uppercase transition-colors flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Sync_Calendar
        </button>
      </div>

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
                    {i === 4 && (day === 2 || day === 4) ? (
                      <div className="p-2 border bg-[#050505] border-emerald-500/50 hover:border-emerald-400 transition-colors cursor-pointer group relative">
                        <div className="text-xs font-bold uppercase text-emerald-400">Playwright Master</div>
                        <div className="text-[10px] text-emerald-600">Batch {day === 2 ? '4' : '5'}</div>
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-[8px] bg-emerald-900/50 text-emerald-400 px-1 py-0.5 uppercase border border-emerald-500/30 hover:bg-emerald-500 hover:text-black">Reschedule</button>
                        </div>
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
