import { motion } from "motion/react";
import { Target, Zap, Users, Shield, Info } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
        >
          <Info className="w-4 h-4" />
          <span>About Us</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          Empowering the Next Generation<br />of <span className="text-blue-600">Tech Professionals</span>
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Codecure Acedamy was founded with a singular goal: to bridge the gap between manual testing and elite software development in test (SDET). We don't just teach tools; we build strong engineering foundations.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            In an era where software quality is paramount, our curriculum is designed around real-world industry needs. We focus on practical skills, modern frameworks, and best practices to ensure our students are job-ready from day one.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Students collaborating" className="w-full h-full object-cover" />
          <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-4xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-sm text-slate-600 font-semibold uppercase tracking-wider">Students Trained</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, title: "Focused Learning", desc: "Curriculum designed around current industry demands and modern tools." },
          { icon: Zap, title: "Fast-Track Growth", desc: "Accelerated learning paths to help you reach your career goals faster." },
          { icon: Users, title: "Vibrant Community", desc: "Join an active network of learners, alumni, and industry professionals." },
          { icon: Shield, title: "Quality Assurance", desc: "Learn to build robust, reliable, and scalable automation frameworks." }
        ].map((core, i) => {
          const Icon = core.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{core.title}</h3>
              <p className="text-slate-600 leading-relaxed">{core.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
