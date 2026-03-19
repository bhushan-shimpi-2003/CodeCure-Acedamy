import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export default function Refund() {
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
        Refund Policy<span className="text-emerald-500">_</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-slate-300 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">1. 7-Day Money-Back Guarantee</h2>
          <p>We offer a 7-day money-back guarantee for all our courses. If you are not satisfied with the course content or delivery, you can request a full refund within 7 days of your purchase date.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">2. Eligibility for Refund</h2>
          <p>To be eligible for a refund, you must meet the following criteria:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The refund request is made within 7 days of the original purchase.</li>
            <li>You have not completed more than 20% of the course content.</li>
            <li>You have not downloaded any course materials for offline use.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">3. Process for Requesting a Refund</h2>
          <p>To request a refund, please contact our support team at support@coducure.com with your order details and the reason for your request. Our team will review your request and process the refund within 5-7 business days if approved.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-emerald-400 mb-4 uppercase">4. Non-Refundable Items</h2>
          <p>Certain items are non-refundable, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>One-on-one mentorship sessions that have already taken place.</li>
            <li>Customized training programs designed specifically for an individual or organization.</li>
            <li>Any administrative fees associated with enrollment.</li>
          </ul>
        </section>
      </motion.div>
    </div>
  );
}
