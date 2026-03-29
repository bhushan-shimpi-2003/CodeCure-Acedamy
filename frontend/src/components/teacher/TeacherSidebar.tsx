import { motion } from "motion/react";
import { LayoutDashboard, Users, FileText, Video, MessageSquare, X, LogOut, GraduationCap, User, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: any) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "publish", label: "Publish Lecture", icon: Video },
    { id: "lessons", label: "Published Content", icon: FileText },
    { id: "courses", label: "Active Courses", icon: FileText },
    { id: "students", label: "Students", icon: Users },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "interviews", label: "Mock Interviews", icon: Video },
    { id: "jobs", label: "Job Openings", icon: Briefcase },
    { id: "doubts", label: "Doubt Support", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <motion.aside 
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-2xl md:bg-slate-50/50 md:backdrop-blur-md border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Instructor
            </span>
          </Link>
          <button className="md:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium text-sm group">
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Logout
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
