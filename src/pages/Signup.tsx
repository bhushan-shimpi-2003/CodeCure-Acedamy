import { motion } from "motion/react";
import { Terminal, Lock, Mail, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Signup() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden scanlines matrix-bg selection:bg-emerald-500/30 selection:text-emerald-200 pt-20 pb-10"
    >
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative font-mono z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="bg-emerald-950/50 w-16 h-16 flex items-center justify-center border border-emerald-500/50">
            <Terminal className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2 uppercase">
          Create <span className="text-emerald-500">Profile</span>
        </h2>
        <p className="text-center text-slate-400 text-sm mb-8">
          Register a new node in the Coducure network.
        </p>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-emerald-500 uppercase font-bold flex items-center gap-2">
              <User className="w-4 h-4" /> NODE_ALIAS
            </label>
            <input 
              type="text" 
              className="w-full bg-[#050505] border border-emerald-500/30 p-3 text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-900"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-emerald-500 uppercase font-bold flex items-center gap-2">
              <Mail className="w-4 h-4" /> USER_EMAIL
            </label>
            <input 
              type="email" 
              className="w-full bg-[#050505] border border-emerald-500/30 p-3 text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-900"
              placeholder="admin@coducure.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-emerald-500 uppercase font-bold flex items-center gap-2">
              <Lock className="w-4 h-4" /> PASSWORD_KEY
            </label>
            <input 
              type="password" 
              className="w-full bg-[#050505] border border-emerald-500/30 p-3 text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-900"
              placeholder="••••••••"
            />
          </div>
          
          <Button className="w-full h-12 bg-emerald-500 text-black hover:bg-emerald-400 rounded-none font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] group">
            INIT_REGISTRATION
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-500">
          Already have access? <Link to="/login" className="text-emerald-500 hover:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">Execute login</Link>.
        </div>
      </div>
    </motion.div>
  );
}
