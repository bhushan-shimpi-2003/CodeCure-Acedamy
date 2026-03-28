import { motion } from "motion/react";
import { MessageSquare, CheckCircle, Clock, GraduationCap } from "lucide-react";

export default function TeacherDoubts() {
  const doubts = [
    { id: "DBT-01", student: "Alex Developer", question: "How to handle iframes in Playwright?", time: "10 mins ago", status: "unresolved" },
    { id: "DBT-02", student: "Sarah Connor", question: "Difference between locator.click() and page.click()?", time: "1 hour ago", status: "unresolved" },
    { id: "DBT-03", student: "John Smith", question: "Setup teardown hooks not working.", time: "Yesterday", status: "resolved" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" /> Doubt Support
        </h1>
        <p className="text-slate-500 text-sm">Student questions and discussion threads.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Active Threads
        </h2>
        
        <div className="space-y-4">
          {doubts.map((doubt, i) => (
            <motion.div 
              key={doubt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 border rounded-xl ${doubt.status === 'unresolved' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">{doubt.student}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5" /> {doubt.time}</span>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg border ${doubt.status === 'unresolved' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                  {doubt.status}
                </span>
              </div>
              <p className="text-slate-700 mb-5 font-medium">"{doubt.question}"</p>
              
              {doubt.status === 'unresolved' ? (
                <div className="flex gap-3">
                  <input type="text" placeholder="Type response..." className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                  <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-5 py-2 text-sm font-semibold transition-colors shadow-sm">
                    Reply
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sm text-green-600 font-bold bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
                  <CheckCircle className="w-4 h-4" /> Resolved
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
