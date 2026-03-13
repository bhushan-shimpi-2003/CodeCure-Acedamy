import { motion } from "motion/react";
import { Check, TerminalSquare } from "lucide-react";
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 font-mono"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6">
                <TerminalSquare className="w-4 h-4" />
                <span>APPLYING_PATCH_v2.0</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase">
                The <span className="text-emerald-500">Coducure</span> Upgrade
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                We don't just teach syntax; we build engineers. Our curriculum is designed by industry experts to make you job-ready from day one.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-emerald-500">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="mt-4 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black rounded-none shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              &gt; VIEW_SOURCE_CODE
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Code Editor Mockup */}
            <div className="rounded-none overflow-hidden border border-emerald-500/30 bg-[#0a0a0a] shadow-2xl font-mono">
              <div className="flex items-center px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/30">
                <div className="mx-auto text-emerald-500/70 text-xs">login.spec.ts - Playwright</div>
              </div>
              <div className="p-6 text-sm overflow-x-auto">
                <pre className="text-slate-300">
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
            <div className="absolute -bottom-6 -right-6 bg-black border border-emerald-500 p-4 rounded-none shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-4 animate-pulse font-mono">
              <div className="text-emerald-500">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-500">100% Tests Passed</p>
                <p className="text-xs text-emerald-500/70">Execution time: 1.2s</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
