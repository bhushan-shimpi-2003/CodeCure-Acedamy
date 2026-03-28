import { motion } from "motion/react";
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-blue-600">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 md:p-16 rounded-3xl shadow-2xl relative"
        >
          <div className="mx-auto bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/30">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Launch Your <br className="hidden md:block" />
            <span className="text-blue-200">Automation Career?</span>
          </h2>
          
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Codecure Acedamy today and transform from a manual tester to a highly-paid SDET in just 12 weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-10 text-base bg-white text-blue-600 hover:bg-blue-50 rounded-full font-bold shadow-xl group w-full transition-all hover:scale-105">
                Enroll Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="text-sm text-blue-100 mt-4 sm:mt-0 text-left flex flex-col gap-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Next batch starts soon
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Limited seats available
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
