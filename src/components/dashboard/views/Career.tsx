import { motion } from "motion/react";
import { Briefcase, Video, ExternalLink, Terminal, Calendar, Link as LinkIcon } from "lucide-react";

export default function Career() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Career_&_Placement
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Prepare for interviews and track applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Interviews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
        >
          <div className="flex items-center justify-between mb-6 border-b border-emerald-500/20 pb-2">
            <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-2 uppercase">
              <Video className="w-4 h-4" /> Mock_Interviews
            </h2>
          </div>

          <div className="bg-[#050505] border border-amber-500/50 p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <h3 className="text-xs font-bold text-amber-500 uppercase mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Upcoming_Interview
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Date_&_Time</p>
                <p className="text-sm text-white font-bold">Tomorrow, 16:00 IST</p>
              </div>
              
              <div>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Meeting_Link</p>
                <a href="https://meet.google.com/abc-defg-hij" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/30 px-3 py-2 border border-emerald-500/30">
                  <LinkIcon className="w-4 h-4" /> https://meet.google.com/abc-defg-hij
                </a>
              </div>
              
              <div className="pt-4 border-t border-emerald-900/50">
                <p className="text-xs text-emerald-500 italic">Please join 5 minutes early. Ensure your camera and microphone are working.</p>
              </div>
            </div>
          </div>

          <h3 className="text-[10px] font-bold text-emerald-600 mb-4 uppercase tracking-wider border-b border-emerald-900/50 pb-1">History_Log</h3>
          <div className="space-y-3">
            {[
              { date: "12-OCT-2026", type: "Technical Round 1", score: "8/10", status: "completed" },
              { date: "28-SEP-2026", type: "HR & Behavioral", score: "7/10", status: "completed" },
            ].map((interview, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#050505] border border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-emerald-200 uppercase">{interview.type}</h4>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1">{interview.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400">{interview.score}</div>
                    <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-400 uppercase border-b border-emerald-600/30 hover:border-emerald-400 pb-0.5 mt-1">View_Log</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Openings */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
          >
            <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-2 mb-4 uppercase border-b border-emerald-500/20 pb-2">
              <Briefcase className="w-4 h-4" /> Job_Openings
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-[#050505] border border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
                <h4 className="font-bold text-emerald-200 text-xs uppercase">SDET - Playwright</h4>
                <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">TechCorp Inc. // Remote</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400">12 LPA</span>
                  <button className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-1 uppercase hover:bg-emerald-500 hover:text-black transition-colors">Apply</button>
                </div>
              </div>
              <button className="w-full text-[10px] font-bold text-emerald-600 hover:text-emerald-400 uppercase flex items-center justify-center gap-1 mt-2 border-b border-transparent hover:border-emerald-400 pb-0.5">
                View_All_Openings <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
