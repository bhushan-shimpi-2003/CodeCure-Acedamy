import { motion } from "motion/react";
import { Briefcase, Video, ExternalLink, Calendar, Link as LinkIcon } from "lucide-react";

export default function Career() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" /> Career & Placement
        </h1>
        <p className="text-slate-500 text-sm">Prepare for interviews and track applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Interviews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" /> Mock Interviews
            </h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <h3 className="text-sm font-bold text-amber-700 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Upcoming Interview
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Date & Time</p>
                <p className="text-sm text-slate-900 font-bold">Tomorrow, 16:00 IST</p>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Meeting Link</p>
                <a href="https://meet.google.com/abc-defg-hij" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-lg border border-blue-100 font-medium shadow-sm">
                  <LinkIcon className="w-4 h-4" /> https://meet.google.com/abc-defg-hij
                </a>
              </div>
              
              <div className="pt-4 border-t border-amber-200/50">
                <p className="text-sm text-amber-700">Please join 5 minutes early. Ensure your camera and microphone are working.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">History Log</h3>
          <div className="space-y-3">
            {[
              { date: "12 Oct 2026", type: "Technical Round 1", score: "8/10", status: "completed" },
              { date: "28 Sep 2026", type: "HR & Behavioral", score: "7/10", status: "completed" },
            ].map((interview, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{interview.type}</h4>
                  <p className="text-xs font-medium text-slate-500 mt-1">{interview.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">{interview.score}</div>
                    <button className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mt-1">View Log</button>
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
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Briefcase className="w-5 h-5 text-blue-600" /> Job Openings
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                <h4 className="font-bold text-slate-900 text-sm">SDET - Playwright</h4>
                <p className="text-xs font-medium text-slate-500 mt-1">TechCorp Inc. • Remote</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-600">12 LPA</span>
                  <button className="text-xs font-semibold bg-white text-blue-600 border border-blue-200 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">Apply</button>
                </div>
              </div>
              <button className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1.5 mt-4 transition-colors">
                View All Openings <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
