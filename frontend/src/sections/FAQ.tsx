import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    answer: "Yes, upon successful completion of the course and the final real-time project, you will receive an industry-recognized certificate from Codecure Acedamy."
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer flexible EMI options. You can choose to pay in 3 or 6 easy monthly installments at 0% interest."
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-slate-600">
            Find answers to common queries about our program, schedule, and placement support.
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
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-lg text-slate-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openFaq === index ? "rotate-180 text-blue-600" : ""
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
                    <div className="p-6 pt-0 bg-slate-50">
                      <p className="text-slate-600 leading-relaxed mt-2">
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
