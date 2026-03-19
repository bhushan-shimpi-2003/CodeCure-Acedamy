import { motion } from "motion/react";
import { FileCode2, Terminal, Search, Filter, Eye } from "lucide-react";

export default function AdminAssignments() {
  const assignments = [
    { id: "ASN_001", title: "JS Array Methods", teacher: "Prof. Smith", course: "JavaScript Basics", submissions: 45, date: "Today" },
    { id: "ASN_002", title: "First Playwright Script", teacher: "Dr. Jones", course: "Playwright Automation", submissions: 32, date: "Yesterday" },
    { id: "ASN_003", title: "React Hooks Practice", teacher: "Prof. Smith", course: "React Masterclass", submissions: 28, date: "2 days ago" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Assignment_Logs
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Monitor assignments created by instructors.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 focus-within:border-emerald-500 transition-colors">
            <Search className="w-4 h-4 text-emerald-600" />
            <input 
              type="text" 
              placeholder="Search by title, teacher, or course..." 
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
                <th className="p-4 font-bold">Title</th>
                <th className="p-4 font-bold">Course</th>
                <th className="p-4 font-bold">Teacher</th>
                <th className="p-4 font-bold">Submissions</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30">
              {assignments.map((asn, i) => (
                <motion.tr 
                  key={asn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-emerald-950/20 transition-colors"
                >
                  <td className="p-4 text-xs text-emerald-500 font-bold">{asn.id}</td>
                  <td className="p-4 text-sm text-white font-bold">{asn.title}</td>
                  <td className="p-4 text-sm text-emerald-200">{asn.course}</td>
                  <td className="p-4 text-sm text-emerald-600">{asn.teacher}</td>
                  <td className="p-4 text-sm text-emerald-400 font-bold">{asn.submissions}</td>
                  <td className="p-4 text-right">
                    <button className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1 text-xs font-bold uppercase transition-colors flex items-center gap-2 ml-auto">
                      <Eye className="w-3.5 h-3.5" /> View_Details
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
