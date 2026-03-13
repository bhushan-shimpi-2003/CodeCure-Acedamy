import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, ChevronRight, Play } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Initialize SDET_Protocol...\nLoading Playwright Modules...\nBypassing Manual Testing...\nAccess Granted: Welcome to Coducure Academy.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-emerald-500/20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm mb-6">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM.STATUS: ONLINE</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] uppercase font-mono glitch-text" data-text="BECOME AN AUTOMATION TESTER">
              BECOME AN <br/><span className="text-emerald-500">AUTOMATION TESTER</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-8 font-mono">
              &gt; Execute 12-week intensive training.<br/>
              &gt; Master Playwright & Selenium.<br/>
              &gt; Deploy to high-paying SDET roles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 font-mono">
              <Button size="lg" className="text-base h-14 px-8 bg-emerald-500 text-black hover:bg-emerald-400 rounded-none border border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] group">
                <ChevronRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                EXECUTE_ENROLLMENT
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 bg-black text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/10 rounded-none">
                <Play className="mr-2 w-5 h-5" />
                RUN_DEMO
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            <div className="rounded-md overflow-hidden border border-emerald-500/30 bg-[#0a0a0a] shadow-[0_0_30px_rgba(16,185,129,0.15)] font-mono text-sm">
              <div className="flex items-center px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>
                <div className="mx-auto text-emerald-500/70 text-xs">root@coducure:~</div>
              </div>
              <div className="p-6 h-[320px] overflow-y-auto text-emerald-400">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {text}
                  <span className="animate-pulse inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle"></span>
                </div>
                {text.length === fullText.length && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 text-slate-300"
                  >
                    <span className="text-emerald-500">root@coducure:~#</span> npm run start-career
                    <br/>
                    <span className="text-yellow-400">Starting development server...</span>
                    <br/>
                    <span className="text-emerald-400">✔ Compiled successfully!</span>
                    <br/>
                    <br/>
                    <span className="text-slate-400">// Ready to build real company-level frameworks.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
