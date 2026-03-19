import { motion } from "motion/react";
import { Calendar, Clock, Users, ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function BatchDetails() {
  return (
    <section className="py-24 font-mono relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-[#0a0a0a] border border-emerald-500/50 p-8 md:p-12 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                <Terminal className="w-4 h-4" />
                <span>CRON_JOB_SCHEDULED</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
                Deployment <span className="text-emerald-500">Schedule</span>
              </h2>
              <p className="text-slate-400 mb-8 text-sm">
                Bandwidth is limited! Allocate resources now to secure your spot in the next execution cycle.
              </p>
              
              <div className="space-y-6 mb-8 border-l border-emerald-500/30 pl-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-950/50 p-2 border border-emerald-500/30">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Init_Date</p>
                    <p className="text-sm font-bold text-emerald-500">15th October, 2026</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-950/50 p-2 border border-emerald-500/30">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Duration_&_Timing</p>
                    <p className="text-sm font-bold text-emerald-500">12 Weeks | Weekends (10 AM - 1 PM)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-950/50 p-2 border border-emerald-500/30">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Thread_Pool</p>
                    <p className="text-sm font-bold text-emerald-500">Limited to 30 Nodes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black p-8 border border-emerald-500/30 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <div className="inline-block bg-red-950/50 text-red-500 font-bold px-4 py-1 text-xs border border-red-500/30 mb-6 animate-pulse uppercase">
                WARNING: Only 5 Nodes Available!
              </div>
              
              <div className="mb-6">
                <p className="text-slate-500 line-through mb-1 text-sm">₹35,000</p>
                <h3 className="text-5xl font-bold text-emerald-500 mb-2">₹24,999</h3>
                <p className="text-xs text-emerald-400/70 font-medium uppercase">Early Bird Protocol (Valid till 10th Oct)</p>
              </div>
              
              <Link to="/checkout" className="w-full block mb-4">
                <Button size="lg" className="w-full h-14 text-sm bg-emerald-500 text-black hover:bg-emerald-400 rounded-none font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] group">
                  EXECUTE_PAYMENT
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <p className="text-xs text-slate-500">EMI options available. 7-day rollback guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
