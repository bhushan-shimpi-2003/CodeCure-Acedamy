import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Terminal } from "lucide-react";

export default function Analytics() {
  const assignmentData = [
    { name: 'MOD_1', score: 85 },
    { name: 'MOD_2', score: 92 },
    { name: 'MOD_3', score: 78 },
    { name: 'MOD_4', score: 88 },
    { name: 'MOD_5', score: 95 },
  ];

  const progressData = [
    { week: 'W1', hours: 5 },
    { week: 'W2', hours: 8 },
    { week: 'W3', hours: 12 },
    { week: 'W4', hours: 7 },
    { week: 'W5', hours: 15 },
    { week: 'W6', hours: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Performance_Analytics
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Track learning progress and assessment metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">87.6%</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Avg_Assignment_Score</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">57H</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Total_Uptime</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
          <div className="text-4xl font-bold text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">TOP_15%</div>
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Batch_Ranking</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
        >
          <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Assignment_Scores</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assignmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="name" stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <YAxis stroke="#059669" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} fontFamily="monospace" />
                <Tooltip 
                  cursor={{ fill: '#064e3b' }}
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#10b981', borderRadius: '0', color: '#10b981', fontFamily: 'monospace', fontSize: '12px', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Bar dataKey="score" fill="#10b981" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
        >
          <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Uptime_Per_Week</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="week" stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <YAxis stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#10b981', borderRadius: '0', color: '#10b981', fontFamily: 'monospace', fontSize: '12px', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Line type="stepAfter" dataKey="hours" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#050505', stroke: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
