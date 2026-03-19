import { motion } from "motion/react";
import { Check, TerminalSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const solutions = [
  "Structured 12-Week Roadmap from Scratch",
  "Learn Modern Tools: Playwright & JS",
  "Build Real Company-Level Frameworks",
  "1-on-1 Mentorship & Code Reviews",
  "Mock Interviews & Resume Building",
  "Direct Referrals & Placement Support"
];

export default function Solution() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-emerald-500/20 bg-emerald-950/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 font-mono w-full max-w-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs md:text-sm mb-4 md:mb-6 break-all sm:break-normal">
                <TerminalSquare className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                <span>APPLYING_PATCH_v2.0</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight uppercase break-words">
                The <span className="text-emerald-500">Coducure</span> Upgrade
              </h2>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                We don't just teach syntax; we build engineers. Our curriculum is designed by industry experts to make you job-ready from day one.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 md:mt-1 text-emerald-500 shrink-0">
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-slate-300 text-xs md:text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/courses" className="w-full sm:w-auto">
              <Button size="lg" className="mt-2 md:mt-4 w-full bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black rounded-none shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-normal h-auto py-3">
                &gt; VIEW_SOURCE_CODE
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-full"
          >
            {/* Code Editor Mockup */}
            <div className="rounded-none overflow-hidden border border-emerald-500/30 bg-[#0a0a0a] shadow-2xl font-mono w-full">
              <div className="flex items-center px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/30">
                <div className="mx-auto text-emerald-500/70 text-xs">login.spec.ts - Playwright</div>
              </div>
              <div className="p-4 md:p-6 text-xs md:text-sm overflow-x-auto w-full">
                <pre className="text-slate-300 min-w-max">
                  <code>
<span className="text-pink-500">import</span> {'{'} test, expect {'}'} <span className="text-pink-500">from</span> <span className="text-yellow-300">'@playwright/test'</span>;
<br/><br/>
<span className="text-blue-400">test</span>(<span className="text-yellow-300">'user can login successfully'</span>, <span className="text-pink-500">async</span> ({'{'} page {'}'}) =&gt; {'{'}
<br/>
{'  '}<span className="text-slate-500">// Navigate to app</span>
<br/>
{'  '}<span className="text-pink-500">await</span> page.<span className="text-blue-400">goto</span>(<span className="text-yellow-300">'/login'</span>);
<br/><br/>
{'  '}<span className="text-slate-500">// Fill credentials using POM</span>
<br/>
{'  '}<span className="text-pink-500">await</span> loginPage.<span className="text-blue-400">fillCredentials</span>(user.email, user.password);
<br/>
{'  '}<span className="text-pink-500">await</span> loginPage.<span className="text-blue-400">submit</span>();
<br/><br/>
{'  '}<span className="text-slate-500">// Assert successful login</span>
<br/>
{'  '}<span className="text-pink-500">await</span> <span className="text-blue-400">expect</span>(page.<span className="text-blue-400">locator</span>(<span className="text-yellow-300">'.dashboard-title'</span>)).<span className="text-blue-400">toBeVisible</span>();
<br/>
{'}'});
                  </code>
                </pre>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-6 bg-black border border-emerald-500 p-3 md:p-4 rounded-none shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-3 md:gap-4 animate-pulse font-mono z-10 max-w-[90%]">
              <div className="text-emerald-500 shrink-0">
                <Check className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-emerald-500 truncate">100% Tests Passed</p>
                <p className="text-[10px] md:text-xs text-emerald-500/70 truncate">Execution time: 1.2s</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
