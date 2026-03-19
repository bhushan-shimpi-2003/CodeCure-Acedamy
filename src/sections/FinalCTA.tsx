import { motion } from "motion/react";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden font-mono">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-emerald-500/50 p-12 md:p-16 rounded-none shadow-[0_0_40px_rgba(16,185,129,0.15)] relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          
          <div className="mx-auto bg-emerald-950/50 w-20 h-20 flex items-center justify-center mb-8 border border-emerald-500/50">
            <Terminal className="w-10 h-10 text-emerald-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight uppercase">
            Ready to Compile Your <br className="hidden md:block" />
            <span className="text-emerald-500">Automation Career?</span>
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Coducure Academy today and transform from a manual tester to a highly-paid SDET in just 12 weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 px-10 text-sm bg-emerald-500 text-black hover:bg-emerald-400 rounded-none font-bold uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] group w-full">
                SUDO_JOIN_CODUCURE
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-xs text-emerald-500/70 mt-4 sm:mt-0 sm:ml-4 text-left">
              &gt; Next batch starts soon.<br/>&gt; Limited seats available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
