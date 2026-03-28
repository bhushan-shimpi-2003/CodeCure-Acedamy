import { motion } from "motion/react";
import { Users, BookOpen, Layers, DollarSign, Target, LayoutDashboard } from "lucide-react";
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
 <div className="space-y-6 max-w-7xl mx-auto pb-12">
 <div className="border-b border-slate-200 pb-4">
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Platform Overview
 </h1>
 <p className="text-slate-500 text-sm">Global platform metrics and performance indicators.</p>
 </div>

 {/* Top Stats */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
 {[
 { label: "Total Students", value: "1,248", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
 { label: "Active Courses", value: "12", icon: BookOpen, color: "text-green-600", bg: "bg-green-50" },
 { label: "Batch Count", value: "24", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
 { label: "Revenue YTD", value: "₹4.2M", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
 { label: "Placement Rate", value: "92%", icon: Target, color: "text-cyan-600", bg: "bg-cyan-50" },
 ].map((stat, i) => {
 const Icon = stat.icon;
 return (
 <motion.div 
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1 }}
 className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
 >
 <div className="flex justify-between items-start mb-4">
 <span className="text-sm font-medium text-slate-500">{stat.label}</span>
 <div className={`p-2 rounded-lg ${stat.bg}`}>
 <Icon className={`w-5 h-5 ${stat.color}`} />
 </div>
 </div>
 <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
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
 className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
 >
 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Revenue Log H1</h2>
 <div className="h-64 w-full">
 <ResponsiveContainer width="100%" height="100%">
 <LineChart data={revenueData}>
 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
 <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
 <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
 <Tooltip 
 contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '14px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 itemStyle={{ color: '#2563eb', fontWeight: 600 }}
 formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
 />
 <Line type="monotone" dataKey="rev" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#ffffff', stroke: '#2563eb', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#2563eb' }} />
 </LineChart>
 </ResponsiveContainer>
 </div>
 </motion.div>

 {/* Enrollment Chart */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
 >
 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Batch Enrollment Stats</h2>
 <div className="h-64 w-full">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={enrollmentData}>
 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
 <XAxis dataKey="batch" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
 <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
 <Tooltip 
 cursor={{ fill: '#f1f5f9' }}
 contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '14px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 itemStyle={{ color: '#2563eb', fontWeight: 600 }}
 />
 <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </motion.div>
 </div>
 </div>
 );
}
