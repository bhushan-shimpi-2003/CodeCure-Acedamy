import { motion } from "motion/react";
import { Terminal, ShieldCheck, Zap, Target } from "lucide-react";

const outcomes = [
  {
    icon: Terminal,
    title: "SDET_READY",
    desc: "Write clean, scalable, and maintainable automation code like a Software Developer in Test."
  },
  {
    icon: ShieldCheck,
    title: "FRAMEWORK_DEV",
    desc: "Design and build robust automation frameworks from scratch using Page Object Model."
  },
  {
    icon: Zap,
    title: "CI_CD_EXPERT",
    desc: "Integrate tests into deployment pipelines using GitHub Actions and Jenkins."
  },
  {
    icon: Target,
    title: "INTERVIEW_READY",
    desc: "Crack tough technical interviews with our curated 200+ question bank and mock sessions."
  }
];

export default function CourseOutcome() {
  return (
    <section className="py-24 relative font-mono">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            Deployment <span className="text-emerald-500">Status</span>
          </h2>
          <p className="text-lg text-slate-400">
            By the end of this 12-week intensive program, you will transform into a highly sought-after automation professional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] border border-emerald-500/20 p-8 rounded-none hover:border-emerald-500/50 transition-colors group relative"
            >
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500/20 rounded-full group-hover:bg-emerald-500 group-hover:animate-ping"></div>
              <div className="bg-emerald-950/30 w-16 h-16 rounded-none flex items-center justify-center mb-6 border border-emerald-500/30">
                <item.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
