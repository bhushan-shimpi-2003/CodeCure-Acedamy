import { motion } from "motion/react";
import { GraduationCap, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-white border border-slate-200 p-8 md:p-12 max-w-2xl w-full text-center shadow-xl rounded-3xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-50 flex items-center justify-center rounded-2xl">
            <GraduationCap className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-6">Page Not Found</h2>
        
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-left mb-8">
          <p className="text-slate-600 text-sm mb-2">Oops! The page you are looking for doesn't exist.</p>
          <p className="text-slate-600 text-sm mb-2">It might have been moved or deleted.</p>
        </div>

        <Link to="/">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mx-auto hover:scale-[1.02]">
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
