import { motion } from "motion/react";
import { MessageSquare, Star, AlertCircle, Terminal } from "lucide-react";

export default function AdminFeedback() {
  const feedbacks = [
    { id: "FB_01", student: "Alex D.", target: "Rahul Shetty", rating: 5, comment: "Excellent explanation of POM.", type: "teacher_rating" },
    { id: "FB_02", student: "Sarah C.", target: "Platform", rating: 4, comment: "Video player buffers sometimes.", type: "platform_feedback" },
    { id: "FB_03", student: "John S.", target: "Support", rating: 2, comment: "Doubt not resolved for 2 days.", type: "complaint" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Feedback_Data
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Teacher ratings, student feedback, complaints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 text-center"
        >
          <div className="text-4xl font-bold text-emerald-400 mb-2">4.8/5</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />)}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Avg_Teacher_Rating</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 text-center"
        >
          <div className="text-4xl font-bold text-emerald-400 mb-2">92%</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase mt-6">Positive_Platform_Feedback</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-950/20 border border-red-500/50 rounded-none p-6 text-center"
        >
          <div className="text-4xl font-bold text-red-400 mb-2">3</div>
          <div className="text-[10px] font-bold text-red-500 uppercase mt-6">Open_Complaints</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
      >
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Recent_Logs</h2>
        <div className="space-y-4">
          {feedbacks.map((fb, i) => (
            <div key={fb.id} className={`p-4 border ${fb.type === 'complaint' ? 'bg-red-950/10 border-red-500/30' : 'bg-[#050505] border-emerald-900/50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {fb.type === 'complaint' ? <AlertCircle className="w-4 h-4 text-red-500" /> : <MessageSquare className="w-4 h-4 text-emerald-500" />}
                  <span className={`text-xs font-bold uppercase ${fb.type === 'complaint' ? 'text-red-400' : 'text-emerald-400'}`}>[{fb.type}]</span>
                  <span className="text-xs text-emerald-600">from {fb.student} to {fb.target}</span>
                </div>
                {fb.type !== 'complaint' && (
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-3 h-3 ${idx < fb.rating ? 'text-emerald-500 fill-emerald-500' : 'text-emerald-900'}`} />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-emerald-200">"{fb.comment}"</p>
              {fb.type === 'complaint' && (
                <button className="mt-3 text-[10px] font-bold text-red-400 border border-red-500/50 px-3 py-1 uppercase hover:bg-red-500/20 transition-colors">
                  Investigate
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
