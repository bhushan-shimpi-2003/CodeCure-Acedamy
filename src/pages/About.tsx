import { motion } from "motion/react";
import { Terminal, Target, Zap, Users, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Terminal className="w-4 h-4" />
          <span>SYS_ABOUT</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight"
        >
          Decoding_The_Future<br />Of_Automation<span className="text-emerald-500">.</span>
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-emerald-500 uppercase border-b border-emerald-500/30 pb-2 inline-block">Our_Mission</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Coducure Academy was founded with a singular directive: to bridge the gap between manual testing and elite software development in test (SDET). We don't just teach tools; we engineer mindsets.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            In an era where CI/CD pipelines demand zero-tolerance for flakiness, our curriculum is forged in the fires of real-world production environments. We build automation architects, not just script writers.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] border border-emerald-500/30 bg-[#0a0a0a] p-2"
        >
          <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10"></div>
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="Cyberpunk Server Room" className="w-full h-full object-cover grayscale" />
          <div className="absolute bottom-4 right-4 z-20 bg-[#050505]/90 border border-emerald-500 p-4 backdrop-blur-sm">
            <div className="text-3xl font-bold text-emerald-400 mb-1">10K+</div>
            <div className="text-[10px] text-emerald-600 font-bold uppercase">Engineers_Trained</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, title: "Precision", desc: "Zero-fluff curriculum focused on industry demands." },
          { icon: Zap, title: "Velocity", desc: "Accelerated learning paths for rapid career growth." },
          { icon: Users, title: "Community", desc: "Elite network of automation professionals." },
          { icon: Shield, title: "Reliability", desc: "Robust frameworks that withstand production scale." }
        ].map((core, i) => {
          const Icon = core.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-emerald-500/30 p-6 hover:border-emerald-400 transition-colors"
            >
              <Icon className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-white uppercase mb-2">{core.title}</h3>
              <p className="text-sm text-slate-400">{core.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
