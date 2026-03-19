import { motion } from "motion/react";
import { UserCog, Terminal, Plus, Edit, Trash2 } from "lucide-react";

export default function StaffManagement() {
  const staff = [
    { id: "TCH_01", name: "Rahul Shetty", role: "Lead Instructor", courses: ["Playwright Master", "Selenium Pro"], status: "active" },
    { id: "TCH_02", name: "Priya Sharma", role: "Instructor", courses: ["API Testing", "Java Basics"], status: "active" },
    { id: "TCH_03", name: "Amit Kumar", role: "Mentor", courses: ["Mock Interviews"], status: "active" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Staff_Mgmt
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Manage instructors, mentors, and payroll.</p>
        </div>
        <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-2">
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
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 relative group hover:border-emerald-400 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
            <div className="flex justify-between items-start mb-4 pl-2">
              <div>
                <h3 className="font-bold text-white text-lg uppercase">{member.name}</h3>
                <p className="text-xs text-emerald-500 font-bold uppercase">{member.role}</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase">
                {member.status}
              </span>
            </div>
            
            <div className="pl-2 mb-6">
              <p className="text-[10px] text-emerald-700 uppercase font-bold mb-2">Assigned_Courses:</p>
              <div className="flex flex-wrap gap-2">
                {member.courses.map((course, idx) => (
                  <span key={idx} className="text-xs text-emerald-200 bg-[#050505] border border-emerald-900 px-2 py-1">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2 border-t border-emerald-900/50 pt-4">
              <button className="flex-1 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button className="bg-transparent border border-red-500/50 text-red-500 hover:bg-red-900/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
