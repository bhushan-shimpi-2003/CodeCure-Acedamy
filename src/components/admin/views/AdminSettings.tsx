import { motion } from "motion/react";
import { Settings, Shield, Bell, LayoutDashboard, Save } from "lucide-react";

export default function AdminSettings() {
 return (
 <div className="space-y-6 max-w-4xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> SYS_Settings
 </h1>
 <p className="text-slate-500 text-sm ">&gt; RBAC permission control, notification system.</p>
 </div>
 <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
 <Save className="w-4 h-4" /> Save_Config
 </button>
 </div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
 <Shield className="w-4 h-4" /> RBAC_Access_Control
 </h2>
 
 <div className="space-y-6">
 <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
 <div>
 <h3 className="font-bold text-slate-800 text-sm ">Allow Student Registration</h3>
 <p className="text-xs text-slate-500 mt-1">Open public signup endpoints.</p>
 </div>
 <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
 <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
 </div>
 </div>

 <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
 <div>
 <h3 className="font-bold text-slate-800 text-sm ">Auto-Approve Enrollments</h3>
 <p className="text-xs text-slate-500 mt-1">Bypass manual admin verification for paid courses.</p>
 </div>
 <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
 <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
 </div>
 </div>

 <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
 <div>
 <h3 className="font-bold text-slate-800 text-sm ">Instructor Course Creation</h3>
 <p className="text-xs text-slate-500 mt-1">Allow teachers to create new courses independently.</p>
 </div>
 <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
 <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
 </div>
 </div>
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
 <Bell className="w-4 h-4" /> Notification_System
 </h2>
 
 <div className="space-y-6">
 <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
 <div>
 <h3 className="font-bold text-slate-800 text-sm ">Email Alerts (Admin)</h3>
 <p className="text-xs text-slate-500 mt-1">Receive daily summary reports.</p>
 </div>
 <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
 <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
 </div>
 </div>

 <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
 <div>
 <h3 className="font-bold text-slate-800 text-sm ">Slack/Discord Webhooks</h3>
 <p className="text-xs text-slate-500 mt-1">Push system alerts to comms channels.</p>
 </div>
 <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
 <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 );
}
