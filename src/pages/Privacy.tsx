import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export default function Privacy() {
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
        Privacy Policy<span className="text-emerald-500">_</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-slate-300 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">1. Information Collection</h2>
          <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">2. Use of Information</h2>
          <p>We may use the information we collect about you to provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">3. Sharing of Information</h2>
          <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: With third party service providers; In response to a request for information by a competent authority if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">4. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        </section>
      </motion.div>
    </div>
  );
}
