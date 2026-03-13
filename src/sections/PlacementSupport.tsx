import { motion } from "motion/react";
import { FileText, Linkedin, Users, Briefcase, Terminal } from "lucide-react";

const supportItems = [
  {
    icon: FileText,
    title: "RESUME_BUILDER",
    desc: "We help you build a resume that highlights your automation skills and bypasses ATS filters."
  },
  {
    icon: Linkedin,
    title: "LINKEDIN_OPT",
    desc: "Transform your profile to attract recruiters and showcase your GitHub portfolio effectively."
  },
  {
    icon: Users,
    title: "MOCK_INTERVIEWS",
    desc: "Practice with industry experts. Get detailed feedback on your technical and behavioral skills."
  },
  {
    icon: Briefcase,
    title: "REFERRAL_NETWORK",
    desc: "Get direct referrals to top tech companies through our extensive alumni and mentor network."
  }
];

export default function PlacementSupport() {
  return (
    <section id="placement" className="py-24 border-y border-emerald-500/20 bg-emerald-950/5 relative overflow-hidden font-mono">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-4">
            <Terminal className="w-4 h-4" />
            <span>100%_PLACEMENT_ASSISTANCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            Network <span className="text-emerald-500">Routing</span>
          </h2>
          <p className="text-lg text-slate-400">
            Learning is just the first step. We route you directly to your dream job in automation testing.
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
              className="bg-[#0a0a0a] p-8 border border-emerald-500/30 hover:border-emerald-500 transition-colors text-center group"
            >
              <div className="mx-auto bg-emerald-950/30 w-16 h-16 flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:bg-emerald-500/20 transition-colors">
                <item.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-emerald-500 mb-3">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
