import { motion } from "motion/react";
import { FileCode2, LayoutDashboard, Search, Filter, Eye } from "lucide-react";

export default function AdminAssignments() {
 const assignments = [
 { id: "ASN_001", title: "JS Array Methods", teacher: "Prof. Smith", course: "JavaScript Basics", submissions: 45, date: "Today" },
 { id: "ASN_002", title: "First Playwright Script", teacher: "Dr. Jones", course: "Playwright Automation", submissions: 32, date: "Yesterday" },
 { id: "ASN_003", title: "React Hooks Practice", teacher: "Prof. Smith", course: "React Masterclass", submissions: 28, date: "2 days ago" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Assignment_Logs
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Monitor assignments created by instructors.</p>
 </div>
 </div>

 <div className="bg-white border border-slate-200 rounded-xl p-6">
 <div className="flex flex-col md:flex-row gap-4 mb-6">
 <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 focus-within:border-blue-600 transition-colors">
 <Search className="w-4 h-4 text-slate-500" />
 <input 
 type="text" 
 placeholder="Search by title, teacher, or course..." 
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
 <th className="p-4 font-bold">Title</th>
 <th className="p-4 font-bold">Course</th>
 <th className="p-4 font-bold">Teacher</th>
 <th className="p-4 font-bold">Submissions</th>
 <th className="p-4 font-bold text-right">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {assignments.map((asn, i) => (
 <motion.tr 
 key={asn.id}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.05 }}
 className="hover:bg-slate-50 transition-colors"
 >
 <td className="p-4 text-xs text-blue-600 font-bold">{asn.id}</td>
 <td className="p-4 text-sm text-slate-900 font-bold">{asn.title}</td>
 <td className="p-4 text-sm text-slate-800">{asn.course}</td>
 <td className="p-4 text-sm text-slate-500">{asn.teacher}</td>
 <td className="p-4 text-sm text-slate-900 font-bold">{asn.submissions}</td>
 <td className="p-4 text-right">
 <button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-3 py-1 text-xs font-bold transition-colors flex items-center gap-2 ml-auto">
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
