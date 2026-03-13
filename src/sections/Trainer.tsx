import { motion } from "motion/react";
import { Linkedin, Award, Users, Star, Terminal } from "lucide-react";

export default function Trainer() {
  return (
    <section id="trainer" className="py-24 border-y border-emerald-500/20 bg-emerald-950/5 relative overflow-hidden font-mono">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Trainer Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-none overflow-hidden border border-emerald-500/50 relative z-10 bg-[#0a0a0a]">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-50 grayscale mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-emerald-500/30 bg-black/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-500 mb-1">&gt; RAHUL_SHARMA</h3>
                <p className="text-slate-400 text-sm">Lead SDET & Automation Architect</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-emerald-500/20 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-emerald-500/20 -z-10"></div>
          </motion.div>

          {/* Trainer Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                <Terminal className="w-4 h-4" />
                <span>WHOAMI</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
                System <span className="text-emerald-500">Administrator</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                With over 8 years of experience building automation frameworks for Fortune 500 companies, Rahul brings real-world challenges and solutions directly to the classroom.
              </p>
              <p className="text-lg text-emerald-500/80 leading-relaxed border-l-2 border-emerald-500 pl-4 italic">
                "My goal is not just to teach you Playwright, but to change how you think about testing and software quality."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] p-6 border border-emerald-500/30 hover:border-emerald-500 transition-colors">
                <Award className="w-6 h-6 text-emerald-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-1">8+ YRS</h4>
                <p className="text-slate-500 text-xs uppercase">Experience</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 border border-emerald-500/30 hover:border-emerald-500 transition-colors">
                <Users className="w-6 h-6 text-emerald-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-1">1500+</h4>
                <p className="text-slate-500 text-xs uppercase">Mentored</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 border border-emerald-500/30 hover:border-emerald-500 transition-colors">
                <Star className="w-6 h-6 text-emerald-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-1">4.9/5</h4>
                <p className="text-slate-500 text-xs uppercase">Rating</p>
              </div>
              <a href="#" className="bg-emerald-950/30 p-6 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex flex-col justify-center items-center text-center group">
                <Linkedin className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-emerald-400 text-xs uppercase font-bold">Connect</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
