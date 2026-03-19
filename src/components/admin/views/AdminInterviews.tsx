import { motion } from "motion/react";
import { Video, Terminal, Search, Filter, CheckSquare } from "lucide-react";

export default function AdminInterviews() {
  const interviews = [
    { id: "INT_001", student: "Alex Developer", teacher: "Prof. Smith", date: "Tomorrow, 16:00 IST", status: "scheduled" },
    { id: "INT_002", student: "Sarah Connor", teacher: "Dr. Jones", date: "Today, 14:00 IST", status: "scheduled" },
    { id: "INT_003", student: "John Smith", teacher: "Prof. Smith", date: "Yesterday", status: "completed" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Mock_Interviews_Log
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Monitor scheduled and completed interviews.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 focus-within:border-emerald-500 transition-colors">
            <Search className="w-4 h-4 text-emerald-600" />
            <input 
              type="text" 
              placeholder="Search by student or teacher..." 
              className="bg-transparent border-none outline-none text-sm text-emerald-400 w-full placeholder:text-emerald-900"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 text-emerald-500 hover:bg-emerald-900/30 transition-colors text-sm font-bold uppercase">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-500/30 text-emerald-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">Student</th>
                <th className="p-4 font-bold">Teacher</th>
                <th className="p-4 font-bold">Date & Time</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30">
              {interviews.map((int, i) => (
                <motion.tr 
                  key={int.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-emerald-950/20 transition-colors"
                >
                  <td className="p-4 text-xs text-emerald-500 font-bold">{int.id}</td>
                  <td className="p-4 text-sm text-white font-bold">{int.student}</td>
                  <td className="p-4 text-sm text-emerald-200">{int.teacher}</td>
                  <td className="p-4 text-sm text-emerald-600">{int.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      int.status === 'scheduled' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {int.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1 text-xs font-bold uppercase transition-colors flex items-center gap-2 ml-auto">
                      <CheckSquare className="w-3.5 h-3.5" /> View_Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
