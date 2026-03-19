import { motion } from "motion/react";
import { Users, BookOpen, Layers, DollarSign, Target, Terminal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminOverview() {
  const revenueData = [
    { month: 'JAN', rev: 450000 },
    { month: 'FEB', rev: 520000 },
    { month: 'MAR', rev: 480000 },
    { month: 'APR', rev: 610000 },
    { month: 'MAY', rev: 590000 },
    { month: 'JUN', rev: 750000 },
  ];

  const enrollmentData = [
    { batch: 'B1', students: 45 },
    { batch: 'B2', students: 52 },
    { batch: 'B3', students: 38 },
    { batch: 'B4', students: 65 },
    { batch: 'B5', students: 48 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> SYS_Overview_Analytics
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Global platform metrics and performance indicators.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total_Students", value: "1,248", icon: Users, color: "text-blue-400", border: "border-blue-500/30" },
          { label: "Active_Courses", value: "12", icon: BookOpen, color: "text-emerald-400", border: "border-emerald-500/30" },
          { label: "Batch_Count", value: "24", icon: Layers, color: "text-purple-400", border: "border-purple-500/30" },
          { label: "Revenue_YTD", value: "₹4.2M", icon: DollarSign, color: "text-amber-400", border: "border-amber-500/30" },
          { label: "Placement_Rate", value: "92%", icon: Target, color: "text-cyan-400", border: "border-cyan-500/30" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#0a0a0a] border ${stat.border} rounded-none p-4 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
        >
          <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Revenue_Log_H1</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="month" stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <YAxis stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#10b981', borderRadius: '0', color: '#10b981', fontFamily: 'monospace', fontSize: '12px', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#34d399' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="stepAfter" dataKey="rev" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#050505', stroke: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enrollment Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
        >
          <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Batch_Enrollment_Stats</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="batch" stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <YAxis stroke="#059669" fontSize={10} tickLine={false} axisLine={false} fontFamily="monospace" />
                <Tooltip 
                  cursor={{ fill: '#064e3b' }}
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#10b981', borderRadius: '0', color: '#10b981', fontFamily: 'monospace', fontSize: '12px', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Bar dataKey="students" fill="#10b981" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
