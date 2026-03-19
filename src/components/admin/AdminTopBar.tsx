import { Menu, Bell, Search, ShieldAlert } from "lucide-react";

export default function AdminTopBar({ setIsSidebarOpen }: any) {
  return (
    <header className="h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-emerald-500/30 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 font-mono">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-emerald-500 hover:text-emerald-400"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-[#050505] border border-emerald-500/30 rounded-none px-4 py-2 w-64 focus-within:border-emerald-500 focus-within:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all">
          <span className="text-emerald-500 font-bold">&gt;</span>
          <input 
            type="text" 
            placeholder="grep -r 'admin_query'..." 
            className="bg-transparent border-none outline-none text-sm text-emerald-400 w-full placeholder:text-emerald-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-emerald-500 hover:text-emerald-400 transition-colors rounded-none hover:bg-emerald-950/30 border border-transparent hover:border-emerald-500/30">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a] animate-pulse"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-emerald-500/30">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-emerald-400 uppercase">Super_Admin</p>
            <p className="text-xs text-red-500 uppercase">Level_0_Clearance</p>
          </div>
          <div className="w-9 h-9 rounded-none bg-red-500/20 flex items-center justify-center text-red-500 font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)] border border-red-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
