import { motion } from "motion/react";
import { BarChart3, TrendingUp, Users, Terminal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeacherAnalytics() {
  const engagementData = [
    { name: 'MOD_1', views: 95, completion: 90 },
    { name: 'MOD_2', views: 88, completion: 85 },
    { name: 'MOD_3', views: 92, completion: 78 },
    { name: 'MOD_4', views: 85, completion: 70 },
    { name: 'MOD_5', views: 80, completion: 65 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Teaching_Stats
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Course completion % and student engagement stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2">78%</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Avg_Course_Completion</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2">88%</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Avg_Video_Views</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2">4.8/5</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Instructor_Rating</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
      >
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Engagement_Metrics</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
              <XAxis dataKey="name" stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
              <YAxis stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
              <Tooltip 
                cursor={{ fill: '#064e3b' }}
                contentStyle={{ backgroundColor: '#050505', borderColor: '#10b981', borderRadius: '0', color: '#10b981', fontFamily: 'monospace', fontSize: '12px', textTransform: 'uppercase' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Bar dataKey="views" fill="#10b981" radius={[0, 0, 0, 0]} name="Views %" />
              <Bar dataKey="completion" fill="#059669" radius={[0, 0, 0, 0]} name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
