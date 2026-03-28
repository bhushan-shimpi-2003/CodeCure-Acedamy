import { motion } from "motion/react";
import { Calendar, Clock, RefreshCw, GraduationCap } from "lucide-react";

export default function TeacherTimetable() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Timetable View
          </h1>
          <p className="text-slate-500 text-sm">Weekly schedule and class rescheduling.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
          <RefreshCw className="w-4 h-4" /> Sync Calendar
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold w-24">Time</th>
              <th className="p-4 font-semibold">Monday</th>
              <th className="p-4 font-semibold">Tuesday</th>
              <th className="p-4 font-semibold">Wednesday</th>
              <th className="p-4 font-semibold">Thursday</th>
              <th className="p-4 font-semibold">Friday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['09:00', '11:00', '14:00', '16:00', '20:00'].map((time, i) => (
              <tr key={time} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm text-slate-500 font-medium">{time}</td>
                {[1, 2, 3, 4, 5].map((day) => (
                  <td key={day} className="p-2">
                    {i === 4 && (day === 2 || day === 4) ? (
                      <div className="p-3 border bg-blue-50 border-blue-200 hover:border-blue-400 rounded-xl transition-colors cursor-pointer group relative shadow-sm">
                        <div className="text-sm font-bold text-blue-900">Playwright Master</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">Batch {day === 2 ? '4' : '5'}</div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-[10px] bg-white text-slate-700 px-2 py-1 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition-colors">Reschedule</button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 border border-transparent hover:border-slate-200 rounded-xl transition-colors cursor-pointer h-16"></div>
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
