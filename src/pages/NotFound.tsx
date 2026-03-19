import { motion } from "motion/react";
import { Terminal, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 font-mono matrix-bg scanlines relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-[#0a0a0a] border border-emerald-500/50 p-8 md:p-12 max-w-2xl w-full text-center shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500 flex items-center justify-center rounded-none animate-pulse">
            <Terminal className="w-10 h-10 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4 tracking-tighter">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase">ERR_FILE_NOT_FOUND</h2>
        
        <div className="bg-[#050505] border border-emerald-900/50 p-4 text-left mb-8">
          <p className="text-emerald-500 text-sm mb-2">&gt; System diagnostic initiated...</p>
          <p className="text-emerald-500 text-sm mb-2">&gt; Locating requested sector...</p>
          <p className="text-red-500 text-sm font-bold">&gt; FATAL: Sector does not exist or access denied.</p>
          <p className="text-emerald-500 text-sm mt-4 animate-pulse">&gt; _</p>
        </div>

        <Link to="/">
          <button className="bg-emerald-500 text-black px-8 py-3 font-bold uppercase hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 mx-auto">
            <Home className="w-4 h-4" /> Return_To_Base
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
