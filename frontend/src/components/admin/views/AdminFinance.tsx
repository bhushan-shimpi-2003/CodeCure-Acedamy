import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DollarSign, ArrowUpRight, LayoutDashboard, CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminFinance() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/admin/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (err) {
      console.error("Failed to load transactions", err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" /> Finance Log
          </h1>
          <p className="text-slate-500 text-sm">&gt; Fee collection, pending dues, salary payout.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-500">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">₹{totalCredit.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-red-200 rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-red-600">Total Payouts</span>
            <DollarSign className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">₹{totalDebit.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-500">Total Transactions</span>
            <CreditCard className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">{transactions.length}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-xl p-6"
      >
        <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2">Recent Transactions</h2>
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center p-12 text-slate-500">No transactions recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Description</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn: any) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-xs text-slate-500 font-bold">{(txn.id || "").slice(0, 8)}</td>
                    <td className="p-4 text-sm text-slate-800">{txn.description || txn.desc || "-"}</td>
                    <td className="p-4 text-xs text-slate-500">{txn.created_at ? new Date(txn.created_at).toLocaleDateString() : "-"}</td>
                    <td className={`p-4 text-sm font-bold text-right ${txn.type === 'credit' ? 'text-slate-900' : 'text-red-600'}`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{Number(txn.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
