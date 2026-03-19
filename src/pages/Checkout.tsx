import { motion } from "motion/react";
import { Terminal, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-5xl mx-auto font-mono">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight"
        >
          Secure_Checkout<span className="text-emerald-500">_</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-emerald-600 text-sm uppercase flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" /> 256-bit Encrypted Connection
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> 01_Billing_Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">First_Name</label>
                <input type="text" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Last_Name</label>
                <input type="text" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="Doe" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Email_Address</label>
                <input type="email" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Phone_Number</label>
                <input type="tel" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="+91 98765 43210" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> 02_Payment_Method
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-emerald-500 bg-emerald-950/20 cursor-pointer">
                <input type="radio" name="payment" className="accent-emerald-500 w-4 h-4" defaultChecked />
                <span className="text-sm font-bold text-emerald-400 uppercase">Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-emerald-900/50 bg-[#050505] cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input type="radio" name="payment" className="accent-emerald-500 w-4 h-4" />
                <span className="text-sm font-bold text-slate-400 uppercase">UPI / Net Banking</span>
              </label>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Card_Number</label>
                <input type="text" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Expiry_Date</label>
                  <input type="text" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">CVV</label>
                  <input type="password" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="***" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0a] border border-emerald-500/50 p-6 sticky top-24"
          >
            <h2 className="text-lg font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2">Order_Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-white uppercase">Playwright Master</div>
                  <div className="text-[10px] text-emerald-600 uppercase mt-1">12 Weeks Track</div>
                </div>
                <div className="text-sm font-bold text-emerald-400">₹15,000</div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 uppercase">
                <span>Subtotal</span>
                <span>₹15,000</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 uppercase">
                <span>GST (18%)</span>
                <span>₹2,700</span>
              </div>
            </div>

            <div className="border-t border-emerald-900/50 pt-4 mb-6 flex justify-between items-center">
              <span className="text-sm font-bold text-white uppercase">Total_Amount</span>
              <span className="text-2xl font-bold text-emerald-400">₹17,700</span>
            </div>

            <Link to="/dashboard">
              <button className="w-full bg-emerald-500 text-black py-4 font-bold uppercase hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Execute_Payment
              </button>
            </Link>

            <p className="text-[10px] text-emerald-700 text-center mt-4 uppercase font-bold">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
