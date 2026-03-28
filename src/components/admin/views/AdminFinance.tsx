import { motion } from "motion/react";
import { DollarSign, ArrowUpRight, ArrowDownRight, LayoutDashboard, CreditCard } from "lucide-react";

export default function AdminFinance() {
 const transactions = [
 { id: "TXN_001", type: "credit", desc: "Fee Collection - Batch 4", amount: "₹45,000", date: "Today, 10:30 AM" },
 { id: "TXN_002", type: "debit", desc: "Instructor Payout - Rahul S.", amount: "₹85,000", date: "Yesterday" },
 { id: "TXN_003", type: "credit", desc: "Fee Collection - Batch 5", amount: "₹15,000", date: "10-OCT-2026" },
 { id: "TXN_004", type: "debit", desc: "AWS Server Costs", amount: "₹12,400", date: "08-OCT-2026" },
 ];

 return (
 <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <LayoutDashboard className="w-6 h-6 text-blue-600" /> Finance_Log
 </h1>
 <p className="text-slate-500 text-sm ">&gt; Fee collection, pending dues, salary payout.</p>
 </div>
 <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
 <CreditCard className="w-4 h-4" /> Process_Payout
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden"
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
 <div className="flex justify-between items-start mb-2">
 <span className="text-[10px] font-bold text-slate-500 ">Total_Revenue_MTD</span>
 <DollarSign className="w-4 h-4 text-blue-600" />
 </div>
 <div className="text-3xl font-bold text-slate-900 mb-2">₹4.2M</div>
 <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
 <ArrowUpRight className="w-3 h-3" /> +12.5% vs last month
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="bg-white border border-amber-500/30 rounded-xl p-6 relative overflow-hidden"
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
 <div className="flex justify-between items-start mb-2">
 <span className="text-[10px] font-bold text-amber-600 ">Pending_Dues</span>
 <DollarSign className="w-4 h-4 text-amber-500" />
 </div>
 <div className="text-3xl font-bold text-amber-400 mb-2">₹850K</div>
 <div className="text-xs font-bold text-amber-500 flex items-center gap-1">
 <ArrowDownRight className="w-3 h-3" /> -5.2% vs last month
 </div>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="bg-white border border-red-200 rounded-xl p-6 relative overflow-hidden"
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
 <div className="flex justify-between items-start mb-2">
 <span className="text-[10px] font-bold text-red-600 ">Total_Payouts_MTD</span>
 <DollarSign className="w-4 h-4 text-red-600" />
 </div>
 <div className="text-3xl font-bold text-red-600 mb-2">₹1.1M</div>
 <div className="text-xs font-bold text-red-600 flex items-center gap-1">
 <ArrowUpRight className="w-3 h-3" /> +2.1% vs last month
 </div>
 </motion.div>
 </div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="bg-white border border-slate-200 rounded-xl p-6"
 >
 <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2">Recent_Transactions</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
 <th className="p-4 font-bold">TXN_ID</th>
 <th className="p-4 font-bold">Description</th>
 <th className="p-4 font-bold">Date</th>
 <th className="p-4 font-bold text-right">Amount</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {transactions.map((txn, i) => (
 <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
 <td className="p-4 text-xs text-slate-500 font-bold">{txn.id}</td>
 <td className="p-4 text-sm text-slate-800">{txn.desc}</td>
 <td className="p-4 text-xs text-slate-500">{txn.date}</td>
 <td className={`p-4 text-sm font-bold text-right ${txn.type === 'credit' ? 'text-slate-900' : 'text-red-600'}`}>
 {txn.type === 'credit' ? '+' : '-'}{txn.amount}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>
 </div>
 );
}
