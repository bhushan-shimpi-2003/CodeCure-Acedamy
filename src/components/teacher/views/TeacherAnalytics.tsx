import { motion } from "motion/react";
import { BarChart3, TrendingUp, Users, GraduationCap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeacherAnalytics() {
  const engagementData = [
    { name: 'Mod 1', views: 95, completion: 90 },
    { name: 'Mod 2', views: 88, completion: 85 },
    { name: 'Mod 3', views: 92, completion: 78 },
    { name: 'Mod 4', views: 85, completion: 70 },
    { name: 'Mod 5', views: 80, completion: 65 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" /> Teaching Stats
        </h1>
        <p className="text-slate-500 text-sm">Course completion % and student engagement stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2 mt-2">78%</div>
          <div className="text-sm font-semibold text-slate-500">Avg Course Completion</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2 mt-2">88%</div>
          <div className="text-sm font-semibold text-slate-500">Avg Video Views</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-violet-600"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2 mt-2">4.8/5</div>
          <div className="text-sm font-semibold text-slate-500">Instructor Rating</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">Engagement Metrics</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '14px', fontWeight: '500', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0f172a' }}
              />
              <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Views %" />
              <Bar dataKey="completion" fill="#818cf8" radius={[4, 4, 0, 0]} name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
