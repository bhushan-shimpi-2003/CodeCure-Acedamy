import { Menu, Bell, Search, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function TopBar({ setIsSidebarOpen }: any) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-80 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search courses, assignments..." 
            className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-900">{user?.name || "Student"}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role || "Student"}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 overflow-hidden">
            {user?.profile_picture && user?.profile_picture !== 'no-photo.jpg' ? (
              <img src={user.profile_picture.startsWith('http') ? user.profile_picture : `http://localhost:5000${user.profile_picture}`} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
