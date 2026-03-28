import { motion } from "motion/react";
import { RefreshCcw } from "lucide-react";

export default function Refund() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Legal Document</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 tracking-tight"
      >
        Refund <span className="text-blue-600">Policy</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-slate-600 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. 7-Day Money-Back Guarantee</h2>
          <p>We offer a 7-day money-back guarantee for all our courses. If you are not satisfied with the course content or delivery, you can request a full refund within 7 days of your purchase date.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Eligibility for Refund</h2>
          <p>To be eligible for a refund, you must meet the following criteria:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The refund request is made within 7 days of the original purchase.</li>
            <li>You have not completed more than 20% of the course content.</li>
            <li>You have not downloaded any course materials for offline use.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Process for Requesting a Refund</h2>
          <p>To request a refund, please contact our support team at support@codecureacedamy.com with your order details and the reason for your request. Our team will review your request and process the refund within 5-7 business days if approved.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Non-Refundable Items</h2>
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
