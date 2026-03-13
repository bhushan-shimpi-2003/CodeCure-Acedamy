import { motion } from "motion/react";
import { Terminal, Quote } from "lucide-react";

const testimonials = [
  {
    name: "USER_PRIYA_S",
    role: "SDET @ AMAZON",
    text: "I was stuck in manual testing for 3 years. This course completely changed my career trajectory. The Playwright framework we built is exactly what I use at work now.",
    hike: "HIKE: +150%"
  },
  {
    name: "USER_RAHUL_V",
    role: "AUTO_ENG @ TCS",
    text: "The best part of Coducure is the 1-on-1 mentorship. Rahul sir's way of explaining complex JS concepts made automation feel easy. Highly recommended!",
    hike: "HIKE: +120%"
  },
  {
    name: "USER_SNEHA_G",
    role: "QA_LEAD @ STARTUP",
    text: "I tried learning from YouTube but got confused. This structured roadmap and the real-time e-commerce project gave me the confidence to crack 4 interviews.",
    hike: "HIKE: +200%"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative font-mono">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            Execution <span className="text-emerald-500">Logs</span>
          </h2>
          <p className="text-lg text-slate-400">
            Don't just take our word for it. Read the execution logs from our successful deployments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#0a0a0a] p-8 border border-emerald-500/30 relative group hover:border-emerald-500 transition-colors"
            >
              <Terminal className="absolute top-4 right-4 w-5 h-5 text-emerald-500/30 group-hover:text-emerald-500 transition-colors" />
              
              <div className="mb-6 border-b border-emerald-500/20 pb-4">
                <h4 className="text-emerald-500 font-bold text-sm mb-1">&gt; {testimonial.name}</h4>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                <span className="text-emerald-500/50 mr-2">~</span>
                {testimonial.text}
              </p>
              
              <div className="inline-block bg-emerald-950/50 text-emerald-400 font-bold px-3 py-1 text-xs border border-emerald-500/30">
                {testimonial.hike}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
