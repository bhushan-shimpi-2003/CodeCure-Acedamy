import { motion } from "motion/react";
import { DollarSign, ArrowUpRight, ArrowDownRight, Terminal, CreditCard } from "lucide-react";

export default function AdminFinance() {
  const transactions = [
    { id: "TXN_001", type: "credit", desc: "Fee Collection - Batch 4", amount: "₹45,000", date: "Today, 10:30 AM" },
    { id: "TXN_002", type: "debit", desc: "Instructor Payout - Rahul S.", amount: "₹85,000", date: "Yesterday" },
    { id: "TXN_003", type: "credit", desc: "Fee Collection - Batch 5", amount: "₹15,000", date: "10-OCT-2026" },
    { id: "TXN_004", type: "debit", desc: "AWS Server Costs", amount: "₹12,400", date: "08-OCT-2026" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Finance_Log
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Fee collection, pending dues, salary payout.</p>
        </div>
        <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Process_Payout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Total_Revenue_MTD</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 mb-2">₹4.2M</div>
          <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12.5% vs last month
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-amber-500/30 rounded-none p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-amber-600 uppercase">Pending_Dues</span>
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
          className="bg-[#0a0a0a] border border-red-500/30 rounded-none p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-red-600 uppercase">Total_Payouts_MTD</span>
            <DollarSign className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">₹1.1M</div>
          <div className="text-xs font-bold text-red-500 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +2.1% vs last month
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6"
      >
        <h2 className="text-sm font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Recent_Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-500/30 text-emerald-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">TXN_ID</th>
                <th className="p-4 font-bold">Description</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30">
              {transactions.map((txn, i) => (
                <tr key={txn.id} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="p-4 text-xs text-emerald-600 font-bold">{txn.id}</td>
                  <td className="p-4 text-sm text-emerald-200">{txn.desc}</td>
                  <td className="p-4 text-xs text-emerald-600">{txn.date}</td>
                  <td className={`p-4 text-sm font-bold text-right ${txn.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
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
