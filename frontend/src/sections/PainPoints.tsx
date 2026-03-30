import { motion } from "motion/react";
import { TrendingDown, Clock, Compass } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    title: "High Educational Costs",
    desc: "Premium education shouldn't break the bank. We provide world-class training at affordable rates.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100"
  },
  {
    icon: TrendingDown,
    title: "Lack of Mentorship",
    desc: "Most online courses leave you stranded. We provide 24/7 doubt support from real industry developers.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100"
  },
  {
    icon: Compass,
    title: "Outdated Curriculum",
    desc: "Stop learning tools that nobody uses. Master the exact technologies that modern tech companies demand.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100"
  }
];

export default function PainPoints() {
  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Stop Struggling with <span className="text-blue-600">Old Education</span>
          </h2>
          <p className="text-lg text-slate-600">
            Join the modern learning revolution and launch your career with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-2xl border ${point.border} bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${point.bg}`}>
                <point.icon className={`w-7 h-7 ${point.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
