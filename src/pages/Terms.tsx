import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export default function Terms() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-4xl mx-auto font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
      >
        <Terminal className="w-4 h-4" />
        <span>Legal_Document</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-white mb-12 uppercase tracking-tight"
      >
        Terms & Conditions<span className="text-emerald-500">_</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-slate-300 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">1. Acceptance of Terms</h2>
          <p>By accessing and using the Coducure Academy platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">2. User Account</h2>
          <p>To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">3. Course Content</h2>
          <p>All course materials, including videos, text, and code snippets, are the intellectual property of Coducure Academy. You may not reproduce, distribute, or create derivative works from this content without explicit permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">4. Code of Conduct</h2>
          <p>Users are expected to behave respectfully towards instructors and other students. Any form of harassment, hate speech, or disruptive behavior may result in immediate termination of your account without refund.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">5. Modifications to Service</h2>
          <p>Coducure Academy reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time.</p>
        </section>
      </motion.div>
    </div>
  );
}
