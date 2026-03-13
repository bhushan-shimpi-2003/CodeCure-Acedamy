import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Terminal } from "lucide-react";

const faqs = [
  {
    question: "Who is this course for?",
    answer: "This course is ideal for manual testers looking to switch to automation, freshers wanting to start a career in QA, and developers who want to learn modern automation testing tools like Playwright."
  },
  {
    question: "Do I need prior coding experience?",
    answer: "No, you don't need prior coding experience. We start from the very basics of JavaScript and gradually move to advanced automation concepts."
  },
  {
    question: "What is the duration of the course?",
    answer: "The course is 12 weeks long. Classes are held on weekends (Saturday and Sunday) for 3 hours each day, with assignments and doubt-clearing sessions during the week."
  },
  {
    question: "Do you provide job guarantee?",
    answer: "We provide 100% placement assistance, which includes resume building, mock interviews, and direct referrals to our hiring partners. While we don't 'guarantee' a job (as it depends on your performance in interviews), our students have a 92% placement success rate."
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes, upon successful completion of the course and the final real-time project, you will receive an industry-recognized certificate from Coducure Academy."
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer flexible EMI options. You can choose to pay in 3 or 6 easy monthly installments at 0% interest."
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 border-y border-emerald-500/20 bg-emerald-950/5 font-mono">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-4">
            <Terminal className="w-4 h-4" />
            <span>man coducure</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            System <span className="text-emerald-500">Manual</span>
          </h2>
          <p className="text-lg text-slate-400">
            Find answers to common queries in our documentation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-emerald-500/30 bg-[#0a0a0a] rounded-none"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-950/30 transition-colors"
              >
                <span className="font-bold text-sm text-emerald-500 pr-8 uppercase">&gt; {faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-500 shrink-0 transition-transform duration-300 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-emerald-500/20 bg-black">
                      <p className="text-slate-400 text-sm leading-relaxed mt-4">
                        <span className="text-emerald-500/50 mr-2">~</span>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
