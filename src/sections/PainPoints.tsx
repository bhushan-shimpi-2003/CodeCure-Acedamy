import { motion } from "motion/react";
import { Bug, AlertTriangle, ShieldAlert } from "lucide-react";

const painPoints = [
  {
    icon: Bug,
    title: "ERR_MANUAL_TESTING",
    desc: "Stuck in repetitive tasks. Career growth blocked. Learning opportunities not found.",
    color: "text-red-500",
    border: "border-red-500/30"
  },
  {
    icon: AlertTriangle,
    title: "WARN_LOW_SALARY",
    desc: "Manual testers face stagnant salaries. Automation engineers earn 2x-3x more.",
    color: "text-orange-500",
    border: "border-orange-500/30"
  },
  {
    icon: ShieldAlert,
    title: "FATAL_ROADMAP_CONFUSION",
    desc: "Overwhelmed by too many tools? Outdated tutorials causing compilation errors in your brain?",
    color: "text-yellow-500",
    border: "border-yellow-500/30"
  }
];

export default function PainPoints() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 font-mono">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            &gt; System <span className="text-red-500">Warnings</span> Detected
          </h2>
          <p className="text-lg text-slate-400">
            Analyzing current career trajectory... Multiple critical issues found in your testing career path.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 font-mono">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-none border ${point.border} bg-black/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: point.color }}></div>
              <div className={`w-14 h-14 rounded-none border ${point.border} flex items-center justify-center mb-6 bg-black`}>
                <point.icon className={`w-7 h-7 ${point.color}`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${point.color}`}>{point.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
