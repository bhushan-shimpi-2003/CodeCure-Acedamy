import { motion } from "motion/react";
import { Briefcase, Target, Users, Terminal, ExternalLink } from "lucide-react";

export default function AdminPlacement() {
  const jobs = [
    { id: "JOB_01", role: "SDET - Playwright", company: "TechCorp", ctc: "12-15 LPA", applicants: 45, status: "open" },
    { id: "JOB_02", role: "QA Automation Eng.", company: "InnovateX", ctc: "8-10 LPA", applicants: 28, status: "open" },
    { id: "JOB_03", role: "Senior Tester", company: "GlobalSys", ctc: "18-22 LPA", applicants: 12, status: "closed" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Placement_Ops
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Job openings, interview tracking, referrals.</p>
        </div>
        <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-2">
          <Briefcase className="w-4 h-4" /> Post_Job
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
          >
            <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Active_Job_Listings</h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={job.id} className="bg-[#050505] border border-emerald-900/50 p-4 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-emerald-200 uppercase">{job.role}</h3>
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase border ${job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-500/10 text-slate-400 border-slate-500/30'}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-600 font-bold uppercase">{job.company} // {job.ctc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-400">{job.applicants}</div>
                      <div className="text-[10px] text-emerald-700 uppercase">Applicants</div>
                    </div>
                    <button className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors">
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
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
          >
            <h2 className="text-sm font-bold text-emerald-500 mb-4 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
              <Target className="w-4 h-4" /> Interview_Pipeline
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-emerald-900/50 bg-[#050505]">
                <span className="text-xs font-bold text-emerald-600 uppercase">Shortlisted</span>
                <span className="text-sm font-bold text-emerald-400">42</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-emerald-900/50 bg-[#050505]">
                <span className="text-xs font-bold text-emerald-600 uppercase">In_Progress</span>
                <span className="text-sm font-bold text-amber-400">18</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-emerald-900/50 bg-[#050505]">
                <span className="text-xs font-bold text-emerald-600 uppercase">Placed</span>
                <span className="text-sm font-bold text-blue-400">124</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
          >
            <h2 className="text-sm font-bold text-emerald-500 mb-4 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4" /> Referral_Network
            </h2>
            <p className="text-xs text-emerald-600 mb-4">Manage corporate tie-ups and alumni referrals.</p>
            <button className="w-full bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-4 py-2 rounded-none text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" /> Open_Network_Portal
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
