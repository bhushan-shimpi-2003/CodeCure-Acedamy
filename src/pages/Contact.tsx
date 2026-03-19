import { motion } from "motion/react";
import { Terminal, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Terminal className="w-4 h-4" />
          <span>SYS_CONTACT</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight"
        >
          Establish_Connection<span className="text-emerald-500">.</span>
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-[#0a0a0a] border border-emerald-500/30 p-8">
            <h2 className="text-xl font-bold text-emerald-500 uppercase mb-6 border-b border-emerald-500/20 pb-2">Comm_Channels</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#050505] border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-1">Email_Protocol</div>
                  <a href="mailto:hello@coducure.com" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">hello@coducure.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#050505] border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-1">Voice_Comms</div>
                  <a href="tel:+919876543210" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#050505] border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase mb-1">HQ_Coordinates</div>
                  <p className="text-emerald-400 font-bold">Tech Park, Sector 62<br/>Noida, UP 201309</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] border border-emerald-500/30 p-8"
        >
          <h2 className="text-xl font-bold text-emerald-500 uppercase mb-6 border-b border-emerald-500/20 pb-2">Transmit_Message</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Identifier (Name)</label>
              <input type="text" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="Enter your name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Return_Address (Email)</label>
              <input type="email" className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Payload (Message)</label>
              <textarea rows={4} className="w-full bg-[#050505] border border-emerald-900/50 px-4 py-3 text-emerald-400 outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Enter your message..."></textarea>
            </div>

            <button type="submit" className="w-full bg-emerald-500 text-black py-4 font-bold uppercase hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Execute_Transmission
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
