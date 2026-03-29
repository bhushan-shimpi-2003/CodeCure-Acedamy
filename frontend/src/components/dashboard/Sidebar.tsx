import { motion } from "motion/react";
import { LayoutDashboard, PlayCircle, FileText, Briefcase, MessageSquare, X, LogOut, GraduationCap, User, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: any) {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "courses", label: "Available Courses", icon: BookOpen },
    { id: "lectures", label: "Lectures", icon: PlayCircle },
    { id: "assignments", label: "Assignment", icon: FileText },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "doubts", label: "Doubt Support", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside 
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-2xl md:bg-slate-50/50 md:backdrop-blur-md border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Codecure Academy
            </span>
          </Link>
          <button className="md:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
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
          <button onClick={handleLogout} className="w-full flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
}
