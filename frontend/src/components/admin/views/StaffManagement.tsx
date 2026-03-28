import { motion } from "motion/react";
import { UserCog, LayoutDashboard, Plus, Edit, Trash2 } from "lucide-react";

export default function StaffManagement() {
 const staff = [
 { id: "TCH_01", name: "Rahul Shetty", role: "Lead Instructor", courses: ["Playwright Master", "Selenium Pro"], status: "active" },
 { id: "TCH_02", name: "Priya Sharma", role: "Instructor", courses: ["API Testing", "Java Basics"], status: "active" },
 { id: "TCH_03", name: "Amit Kumar", role: "Mentor", courses: ["Mock Interviews"], status: "active" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Staff_Mgmt
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Manage instructors, mentors, and payroll.</p>
 </div>
 <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
 <Plus className="w-4 h-4" /> Add_Staff
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {staff.map((member, i) => (
 <motion.div 
 key={member.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 rounded-xl p-6 relative group hover:border-blue-400 transition-colors"
 >
 <div className="absolute top-0 left-0 w-1 h-full bg-blue-100 group-hover:bg-blue-600 transition-colors"></div>
 <div className="flex justify-between items-start mb-4 pl-2">
 <div>
 <h3 className="font-bold text-slate-900 text-lg ">{member.name}</h3>
 <p className="text-xs text-blue-600 font-bold ">{member.role}</p>
 </div>
 <span className="px-2 py-0.5 bg-blue-50 text-slate-900 text-[10px] font-bold border border-slate-200 ">
 {member.status}
 </span>
 </div>
 
 <div className="pl-2 mb-6">
 <p className="text-[10px] text-slate-500 font-bold mb-2">Assigned_Courses:</p>
 <div className="flex flex-wrap gap-2">
 {member.courses.map((course, idx) => (
 <span key={idx} className="text-xs text-slate-800 bg-slate-50 border border-slate-200 px-2 py-1">
 {course}
 </span>
 ))}
 </div>
 </div>

 <div className="flex items-center gap-2 pl-2 border-t border-slate-100 pt-4">
 <button className="flex-1 bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold transition-colors flex items-center justify-center gap-2">
 <Edit className="w-3.5 h-3.5" /> Edit
 </button>
 <button className="bg-transparent border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 text-xs font-bold transition-colors flex items-center justify-center">
 <Trash2 className="w-3.5 h-3.5" />
 </button>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 );
}
