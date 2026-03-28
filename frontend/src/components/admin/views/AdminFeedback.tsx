import { motion } from "motion/react";
import { MessageSquare, Star, AlertCircle, LayoutDashboard } from "lucide-react";

export default function AdminFeedback() {
 const feedbacks = [
 { id: "FB_01", student: "Alex D.", target: "Rahul Shetty", rating: 5, comment: "Excellent explanation of POM.", type: "teacher_rating" },
 { id: "FB_02", student: "Sarah C.", target: "Platform", rating: 4, comment: "Video player buffers sometimes.", type: "platform_feedback" },
 { id: "FB_03", student: "John S.", target: "Support", rating: 2, comment: "Doubt not resolved for 2 days.", type: "complaint" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4">
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Feedback_Data
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Teacher ratings, student feedback, complaints.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white border border-slate-200 rounded-xl p-6 text-center"
 >
 <div className="text-4xl font-bold text-slate-900 mb-2">4.8/5</div>
 <div className="flex justify-center gap-1 mb-2">
 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
 </div>
 <div className="text-[10px] font-bold text-slate-500 ">Avg_Teacher_Rating</div>
 </motion.div>
 
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="bg-white border border-slate-200 rounded-xl p-6 text-center"
 >
 <div className="text-4xl font-bold text-slate-900 mb-2">92%</div>
 <div className="text-[10px] font-bold text-slate-500 mt-6">Positive_Platform_Feedback</div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
 >
 <div className="text-4xl font-bold text-red-600 mb-2">3</div>
 <div className="text-[10px] font-bold text-red-600 mt-6">Open_Complaints</div>
 </motion.div>
 </div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2">Recent_Logs</h2>
 <div className="space-y-4">
 {feedbacks.map((fb, i) => (
 <div key={fb.id} className={`p-4 border ${fb.type === 'complaint' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
 <div className="flex justify-between items-start mb-2">
 <div className="flex items-center gap-2">
 {fb.type === 'complaint' ? <AlertCircle className="w-4 h-4 text-red-600" /> : <MessageSquare className="w-4 h-4 text-blue-600" />}
 <span className={`text-xs font-bold ${fb.type === 'complaint' ? 'text-red-600' : 'text-slate-900'}`}>[{fb.type}]</span>
 <span className="text-xs text-slate-500">from {fb.student} to {fb.target}</span>
 </div>
 {fb.type !== 'complaint' && (
 <div className="flex gap-0.5">
 {[...Array(5)].map((_, idx) => (
 <Star key={idx} className={`w-3 h-3 ${idx < fb.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
 ))}
 </div>
 )}
 </div>
 <p className="text-sm text-slate-800">"{fb.comment}"</p>
 {fb.type === 'complaint' && (
 <button className="mt-3 text-[10px] font-bold text-red-600 border border-red-200 px-3 py-1 hover:bg-red-100 transition-colors">
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
