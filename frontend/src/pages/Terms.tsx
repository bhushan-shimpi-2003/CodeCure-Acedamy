import { motion } from "motion/react";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
      >
        <FileText className="w-4 h-4" />
        <span>Legal Document</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 tracking-tight"
      >
        Terms & <span className="text-blue-600">Conditions</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-slate-600 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the Codecure Acedamy platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. User Account</h2>
          <p>To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Course Content</h2>
          <p>All course materials, including videos, text, and code snippets, are the intellectual property of Codecure Acedamy. You may not reproduce, distribute, or create derivative works from this content without explicit permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Code of Conduct</h2>
          <p>Users are expected to behave respectfully towards instructors and other students. Any form of harassment, hate speech, or disruptive behavior may result in immediate termination of your account without refund.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. Modifications to Service</h2>
          <p>Codecure Acedamy reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time.</p>
        </section>
      </motion.div>
    </div>
  );
}
