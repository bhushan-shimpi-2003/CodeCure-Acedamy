import { motion } from "motion/react";
import { FileCode2, UploadCloud, CheckSquare, Clock, FileText } from "lucide-react";

export default function Assignments() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" /> Tasks & Assignments
        </h1>
        <p className="text-slate-500 text-sm">Apply knowledge through practical execution.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
          <FileCode2 className="w-5 h-5 text-blue-600" /> Module Assignments
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: "JS Array Methods Practice", status: "graded", score: "9.5/10", due: "Past Due" },
            { title: "First Playwright Script", status: "submitted", score: "Pending", due: "Past Due" },
            { title: "Complex Locators Challenge", status: "pending", score: "-", due: "Tomorrow, 11:59 PM" },
            { title: "API Mocking Task", status: "locked", score: "-", due: "Next Week" },
          ].map((task, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 w-1 h-full ${
                task.status === 'graded' ? 'bg-emerald-500' :
                task.status === 'submitted' ? 'bg-blue-500' :
                task.status === 'pending' ? 'bg-amber-500' :
                'bg-slate-300'
              }`}></div>
              <div className="flex justify-between items-start mb-4 pl-3">
                <h3 className="font-bold text-slate-900 text-base">{task.title}</h3>
                {task.status === 'graded' && <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">Graded</span>}
                {task.status === 'submitted' && <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">Submitted</span>}
                {task.status === 'pending' && <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">Action Req</span>}
                {task.status === 'locked' && <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded-full border border-slate-200">Locked</span>}
              </div>
              
              <div className="flex items-center justify-between text-sm font-medium pl-3">
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {task.due}</span>
                  <span className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> Score: {task.score}</span>
                </div>
                
                {task.status === 'pending' && (
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-semibold transition-colors">
                    <UploadCloud className="w-4 h-4" /> Submit
                  </button>
                )}
                {task.status === 'graded' && (
                  <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 font-semibold transition-colors">
                    View Log
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
