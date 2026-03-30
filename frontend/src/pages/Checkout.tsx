import { motion } from "motion/react";
import { CreditCard, ShieldCheck, Lock, User, Mail, Phone, Calendar, Hash } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
        >
          Secure <span className="text-blue-600">Checkout</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-sm flex items-center justify-center gap-2 font-medium"
        >
          <Lock className="w-4 h-4 text-emerald-500" /> 256-bit Encrypted Connection
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">1</span>
              Billing Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="John" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border-2 border-blue-500 bg-blue-50 rounded-2xl cursor-pointer">
                <input type="radio" name="payment" className="w-5 h-5 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="font-semibold text-blue-900">Credit / Debit Card</span>
                <CreditCard className="w-6 h-6 text-blue-500 ml-auto" />
              </label>
              <label className="flex items-center gap-4 p-4 border border-slate-200 bg-white rounded-2xl cursor-pointer hover:border-blue-300 transition-colors">
                <input type="radio" name="payment" className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                <span className="font-medium text-slate-700">UPI / Net Banking</span>
              </label>
            </div>

            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="0000 0000 0000 0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Expiry Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="MM/YY" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">CVV</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" placeholder="***" />
                  </div>
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
            className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-xl sticky top-24"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">Premium Course Enrollment</div>
                  <div className="text-sm text-slate-500 mt-1">Full Certification Track</div>
                </div>
                <div className="font-bold text-slate-900">₹15,000</div>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-600 pt-4 border-t border-slate-100">
                <span>Subtotal</span>
                <span className="font-medium">₹15,000</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>GST (18%)</span>
                <span className="font-medium">₹2,700</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 mb-8 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">₹17,700</span>
            </div>

            <Link to="/dashboard">
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-[1.02]">
                <ShieldCheck className="w-5 h-5" /> Complete Payment
              </button>
            </Link>

            <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
              By completing this purchase, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
