import { motion } from "motion/react";
import { FileText, Linkedin, Users, Briefcase, Target } from "lucide-react";

const supportItems = [
  {
    icon: FileText,
    title: "Resume Building",
    desc: "We help you build a resume that highlights your automation skills and bypasses ATS filters."
  },
  {
    icon: Linkedin,
    title: "LinkedIn Optimization",
    desc: "Transform your profile to attract recruiters and showcase your GitHub portfolio effectively."
  },
  {
    icon: Users,
    title: "Mock Interviews",
    desc: "Practice with industry experts. Get detailed feedback on your technical and behavioral skills."
  },
  {
    icon: Briefcase,
    title: "Referral Network",
    desc: "Get direct referrals to top tech companies through our extensive alumni and mentor network."
  }
];

export default function PlacementSupport() {
  return (
    <section id="placement" className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Target className="w-4 h-4" />
            <span>100% Placement Assistance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Your Path to <span className="text-blue-600">Success</span>
          </h2>
          <p className="text-lg text-slate-600">
            Learning is just the first step. We guide you directly to your dream job in automation testing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="mx-auto bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
