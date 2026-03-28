import { motion } from "motion/react";
import { Calendar, AlertTriangle, Plus, LayoutDashboard, RefreshCw } from "lucide-react";

export default function AdminTimetable() {
 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Timetable_Ctrl
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Manage schedules and resolve conflicts.</p>
 </div>
 <div className="flex gap-3">
 <button className="bg-slate-50 border border-blue-600 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
 <RefreshCw className="w-4 h-4" /> Auto_Generate
 </button>
 <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
 <Plus className="w-4 h-4" /> Schedule_Class
 </button>
 </div>
 </div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
 >
 <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
 <div>
 <h3 className="text-sm font-bold text-red-600 ">SYS_CONFLICT_DETECTED</h3>
 <p className="text-xs text-red-600/80 mt-1">Instructor Rahul Shetty is double-booked on Thursday 20:00 IST (Batch 4 & Batch 5).</p>
 <button className="mt-2 text-xs font-bold text-red-600 border-b border-red-200 hover:border-red-400 ">Resolve_Conflict</button>
 </div>
 </motion.div>

 <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[800px]">
 <thead>
 <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
 <th className="p-4 font-bold w-24">Time</th>
 <th className="p-4 font-bold">Monday</th>
 <th className="p-4 font-bold">Tuesday</th>
 <th className="p-4 font-bold">Wednesday</th>
 <th className="p-4 font-bold">Thursday</th>
 <th className="p-4 font-bold">Friday</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {['09:00', '11:00', '14:00', '16:00', '20:00'].map((time, i) => (
 <tr key={time} className="hover:bg-slate-50 transition-colors">
 <td className="p-4 text-xs text-blue-600 font-bold">{time}</td>
 {[1, 2, 3, 4, 5].map((day) => (
 <td key={day} className="p-2">
 {Math.random() > 0.6 ? (
 <div className={`p-2 border ${i === 4 && day === 4 ? 'bg-red-100 border-red-300' : 'bg-slate-50 border-slate-100 hover:border-blue-600/50'} transition-colors cursor-pointer`}>
 <div className={`text-xs font-bold ${i === 4 && day === 4 ? 'text-red-600' : 'text-slate-900'}`}>Playwright</div>
 <div className="text-[10px] text-slate-500">Batch {day} • Rahul S.</div>
 </div>
 ) : (
 <div className="p-2 border border-transparent hover:border-slate-100 transition-colors cursor-pointer h-12"></div>
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
