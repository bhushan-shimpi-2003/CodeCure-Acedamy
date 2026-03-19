import { motion } from "motion/react";
import { LayoutDashboard, Users, BookOpen, FileCode2, Video, UserCog, DollarSign, MessageSquare, Settings, X, LogOut, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: any) {
  const navItems = [
    { id: "overview", label: "SYS_Overview", icon: LayoutDashboard },
    { id: "students", label: "Student_Mgmt", icon: Users },
    { id: "courses", label: "Course_Mgmt", icon: BookOpen },
    { id: "assignments", label: "Assignment_Logs", icon: FileCode2 },
    { id: "interviews", label: "Interview_Logs", icon: Video },
    { id: "doubts", label: "Doubt_Logs", icon: MessageSquare },
    { id: "staff", label: "Staff_Mgmt", icon: UserCog },
    { id: "finance", label: "Finance_Log", icon: DollarSign },
    { id: "feedback", label: "Feedback_Data", icon: MessageSquare },
    { id: "settings", label: "SYS_Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <motion.aside 
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-emerald-500/30 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-emerald-500/30">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-emerald-500" />
            <span className="font-bold text-xl tracking-tight text-white uppercase">
              Admin_Root<span className="text-emerald-500 animate-pulse">_</span>
            </span>
          </Link>
          <button className="md:hidden text-emerald-500 hover:text-emerald-400" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-200 uppercase text-xs font-bold ${
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                    : "text-slate-400 hover:bg-[#111] hover:text-emerald-500 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-500/30">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-none text-slate-400 hover:bg-[#111] hover:text-red-500 transition-all duration-200 uppercase text-xs font-bold border border-transparent hover:border-red-500/30">
            <LogOut className="w-4 h-4" />
            SYS_LOGOUT
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
