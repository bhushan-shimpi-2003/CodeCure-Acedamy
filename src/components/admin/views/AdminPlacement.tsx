import { motion } from "motion/react";
import { Briefcase, Target, Users, LayoutDashboard, ExternalLink } from "lucide-react";

export default function AdminPlacement() {
 const jobs = [
 { id: "JOB_01", role: "SDET - Playwright", company: "TechCorp", ctc: "12-15 LPA", applicants: 45, status: "open" },
 { id: "JOB_02", role: "QA Automation Eng.", company: "InnovateX", ctc: "8-10 LPA", applicants: 28, status: "open" },
 { id: "JOB_03", role: "Senior Tester", company: "GlobalSys", ctc: "18-22 LPA", applicants: 12, status: "closed" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Placement_Ops
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Job openings, interview tracking, referrals.</p>
 </div>
 <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
 <Briefcase className="w-4 h-4" /> Post_Job
 </button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2">Active_Job_Listings</h2>
 <div className="space-y-4">
 {jobs.map((job, i) => (
 <div key={job.id} className="bg-slate-50 border border-slate-100 p-4 hover:border-blue-600/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <h3 className="font-bold text-slate-800 ">{job.role}</h3>
 <span className={`px-2 py-0.5 text-[8px] font-bold border ${job.status === 'open' ? 'bg-blue-50 text-slate-900 border-slate-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
 {job.status}
 </span>
 </div>
 <p className="text-xs text-slate-500 font-bold ">{job.company} // {job.ctc}</p>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-center">
 <div className="text-lg font-bold text-slate-900">{job.applicants}</div>
 <div className="text-[10px] text-slate-500 ">Applicants</div>
 </div>
 <button className="bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold transition-colors">
 View
 </button>
 </div>
 </div>
 ))}
 </div>
 </motion.div>
 </div>

 <div className="space-y-6">
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
 <Target className="w-4 h-4" /> Interview_Pipeline
 </h2>
 <div className="space-y-3">
 <div className="flex justify-between items-center p-3 border border-slate-100 bg-slate-50">
 <span className="text-xs font-bold text-slate-500 ">Shortlisted</span>
 <span className="text-sm font-bold text-slate-900">42</span>
 </div>
 <div className="flex justify-between items-center p-3 border border-slate-100 bg-slate-50">
 <span className="text-xs font-bold text-slate-500 ">In_Progress</span>
 <span className="text-sm font-bold text-amber-400">18</span>
 </div>
 <div className="flex justify-between items-center p-3 border border-slate-100 bg-slate-50">
 <span className="text-xs font-bold text-slate-500 ">Placed</span>
 <span className="text-sm font-bold text-blue-400">124</span>
 </div>
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
 <Users className="w-4 h-4" /> Referral_Network
 </h2>
 <p className="text-xs text-slate-500 mb-4">Manage corporate tie-ups and alumni referrals.</p>
 <button className="w-full bg-transparent border border-blue-600 text-blue-600 hover:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2">
 <ExternalLink className="w-4 h-4" /> Open_Network_Portal
 </button>
 </motion.div>
 </div>
 </div>
 </div>
 );
}
