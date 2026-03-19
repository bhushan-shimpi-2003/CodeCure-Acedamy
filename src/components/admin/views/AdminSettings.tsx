import { motion } from "motion/react";
import { Settings, Shield, Bell, Terminal, Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> SYS_Settings
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; RBAC permission control, notification system.</p>
        </div>
        <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-2">
          <Save className="w-4 h-4" /> Save_Config
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
      >
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" /> RBAC_Access_Control
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50">
            <div>
              <h3 className="font-bold text-emerald-200 text-sm uppercase">Allow Student Registration</h3>
              <p className="text-xs text-emerald-600 mt-1">Open public signup endpoints.</p>
            </div>
            <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500 relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50">
            <div>
              <h3 className="font-bold text-emerald-200 text-sm uppercase">Auto-Approve Enrollments</h3>
              <p className="text-xs text-emerald-600 mt-1">Bypass manual admin verification for paid courses.</p>
            </div>
            <div className="w-12 h-6 bg-[#111] border border-emerald-900 relative cursor-pointer">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-emerald-700"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50">
            <div>
              <h3 className="font-bold text-emerald-200 text-sm uppercase">Instructor Course Creation</h3>
              <p className="text-xs text-emerald-600 mt-1">Allow teachers to create new courses independently.</p>
            </div>
            <div className="w-12 h-6 bg-[#111] border border-emerald-900 relative cursor-pointer">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-emerald-700"></div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
      >
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notification_System
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50">
            <div>
              <h3 className="font-bold text-emerald-200 text-sm uppercase">Email Alerts (Admin)</h3>
              <p className="text-xs text-emerald-600 mt-1">Receive daily summary reports.</p>
            </div>
            <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500 relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50">
            <div>
              <h3 className="font-bold text-emerald-200 text-sm uppercase">Slack/Discord Webhooks</h3>
              <p className="text-xs text-emerald-600 mt-1">Push system alerts to comms channels.</p>
            </div>
            <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500 relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
