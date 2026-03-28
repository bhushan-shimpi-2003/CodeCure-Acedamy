import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart as BarChartIcon } from "lucide-react";

export default function Analytics() {
  const assignmentData = [
    { name: 'MOD 1', score: 85 },
    { name: 'MOD 2', score: 92 },
    { name: 'MOD 3', score: 78 },
    { name: 'MOD 4', score: 88 },
    { name: 'MOD 5', score: 95 },
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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <BarChartIcon className="w-6 h-6 text-blue-600" /> Performance Analytics
        </h1>
        <p className="text-slate-500 text-sm">Track learning progress and assessment metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2">87.6%</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Assignment Score</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2">57H</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Uptime</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div className="text-4xl font-bold text-slate-900 mb-2">Top 15%</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Ranking</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Assignment Scores</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assignmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '14px', fontWeight: '500', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563eb' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Uptime Per Week</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '14px', fontWeight: '500', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563eb' }}
                />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
