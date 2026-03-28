import { motion } from "motion/react";
import { MessageSquare, LayoutDashboard, Search, Filter, Eye } from "lucide-react";

export default function AdminDoubts() {
 const doubts = [
 { id: "DBT_001", student: "Alex Developer", teacher: "Prof. Smith", subject: "Node.js Event Loop", status: "resolved", date: "Today, 10:00 AM" },
 { id: "DBT_002", student: "Sarah Connor", teacher: "Unassigned", subject: "Playwright Fixtures", status: "pending", date: "Today, 11:30 AM" },
 { id: "DBT_003", student: "John Smith", teacher: "Dr. Jones", subject: "React Hooks", status: "resolved", date: "Yesterday" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Doubt_Resolution_Log
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Monitor student doubts and teacher responses.</p>
 </div>
 </div>

 <div className="bg-white border border-slate-200 rounded-xl p-6">
 <div className="flex flex-col md:flex-row gap-4 mb-6">
 <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 focus-within:border-blue-600 transition-colors">
 <Search className="w-4 h-4 text-slate-500" />
 <input 
 type="text" 
 placeholder="Search by student, teacher, or subject..." 
 className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-300"
 />
 </div>
 <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 text-blue-600 hover:bg-slate-100 transition-colors text-sm font-bold ">
 <Filter className="w-4 h-4" /> Filter
 </button>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
 <th className="p-4 font-bold">ID</th>
 <th className="p-4 font-bold">Student</th>
 <th className="p-4 font-bold">Subject</th>
 <th className="p-4 font-bold">Teacher</th>
 <th className="p-4 font-bold">Status</th>
 <th className="p-4 font-bold text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {doubts.map((doubt, i) => (
 <motion.tr 
 key={doubt.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.05 }}
 className="hover:bg-slate-50 transition-colors"
 >
 <td className="p-4 text-xs text-blue-600 font-bold">{doubt.id}</td>
 <td className="p-4 text-sm text-slate-900 font-bold">{doubt.student}</td>
 <td className="p-4 text-sm text-slate-800">{doubt.subject}</td>
 <td className="p-4 text-sm text-slate-500">{doubt.teacher}</td>
 <td className="p-4">
 <span className={`px-2 py-0.5 text-[10px] font-bold border ${
 doubt.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
 'bg-blue-50 text-slate-900 border-slate-200'
 }`}>
 {doubt.status}
 </span>
 </td>
 <td className="p-4 text-right">
 <button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-3 py-1 text-xs font-bold transition-colors flex items-center gap-2 ml-auto">
 <Eye className="w-3.5 h-3.5" /> View_Thread
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
