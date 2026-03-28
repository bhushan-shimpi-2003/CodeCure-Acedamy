import { motion } from "motion/react";
import { Video, LayoutDashboard, Search, Filter, CheckSquare } from "lucide-react";

export default function AdminInterviews() {
 const interviews = [
 { id: "INT_001", student: "Alex Developer", teacher: "Prof. Smith", date: "Tomorrow, 16:00 IST", status: "scheduled" },
 { id: "INT_002", student: "Sarah Connor", teacher: "Dr. Jones", date: "Today, 14:00 IST", status: "scheduled" },
 { id: "INT_003", student: "John Smith", teacher: "Prof. Smith", date: "Yesterday", status: "completed" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Mock_Interviews_Log
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Monitor scheduled and completed interviews.</p>
 </div>
 </div>

 <div className="bg-white border border-slate-200 rounded-xl p-6">
 <div className="flex flex-col md:flex-row gap-4 mb-6">
 <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 focus-within:border-blue-600 transition-colors">
 <Search className="w-4 h-4 text-slate-500" />
 <input 
 type="text" 
 placeholder="Search by student or teacher..." 
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
 <th className="p-4 font-bold">Teacher</th>
 <th className="p-4 font-bold">Date & Time</th>
 <th className="p-4 font-bold">Status</th>
 <th className="p-4 font-bold text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {interviews.map((int, i) => (
 <motion.tr 
 key={int.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.05 }}
 className="hover:bg-slate-50 transition-colors"
 >
 <td className="p-4 text-xs text-blue-600 font-bold">{int.id}</td>
 <td className="p-4 text-sm text-slate-900 font-bold">{int.student}</td>
 <td className="p-4 text-sm text-slate-800">{int.teacher}</td>
 <td className="p-4 text-sm text-slate-500">{int.date}</td>
 <td className="p-4">
 <span className={`px-2 py-0.5 text-[10px] font-bold border ${
 int.status === 'scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' :
 'bg-blue-50 text-slate-900 border-slate-200'
 }`}>
 {int.status}
 </span>
 </td>
 <td className="p-4 text-right">
 <button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-3 py-1 text-xs font-bold transition-colors flex items-center gap-2 ml-auto">
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
