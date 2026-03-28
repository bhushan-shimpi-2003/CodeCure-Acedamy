import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
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
    <section className="py-24 relative overflow-hidden bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 w-full max-w-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                <span>The Coducure Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
                Transform Your Career with <span className="text-blue-600">Expert Guidance</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                We don't just teach syntax; we build engineers. Our curriculum is designed by industry experts to make you job-ready from day one.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 md:mt-1 bg-blue-100 p-1 rounded-full text-blue-600 shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <span className="text-slate-700 text-xs md:text-sm leading-snug font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/courses" className="w-full sm:w-auto inline-block">
              <Button size="lg" className="mt-2 md:mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/20 whitespace-normal h-auto py-3 px-8 text-base">
                View Curriculum
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
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl w-full">
              <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto text-slate-500 text-xs font-mono font-medium">login.spec.ts - Playwright</div>
              </div>
              <div className="p-4 md:p-6 text-xs md:text-sm overflow-x-auto w-full font-mono bg-[#0d1117]">
                <pre className="text-slate-300 min-w-max">
                  <code>
<span className="text-pink-400">import</span> {'{'} test, expect {'}'} <span className="text-pink-400">from</span> <span className="text-amber-300">'@playwright/test'</span>;
<br/><br/>
<span className="text-blue-400">test</span>(<span className="text-amber-300">'user can login successfully'</span>, <span className="text-pink-400">async</span> ({'{'} page {'}'}) =&gt; {'{'}
<br/>
{'  '}<span className="text-slate-500">// Navigate to app</span>
<br/>
{'  '}<span className="text-pink-400">await</span> page.<span className="text-blue-400">goto</span>(<span className="text-amber-300">'/login'</span>);
<br/><br/>
{'  '}<span className="text-slate-500">// Fill credentials using POM</span>
<br/>
{'  '}<span className="text-pink-400">await</span> loginPage.<span className="text-blue-400">fillCredentials</span>(user.email, user.password);
<br/>
{'  '}<span className="text-pink-400">await</span> loginPage.<span className="text-blue-400">submit</span>();
<br/><br/>
{'  '}<span className="text-slate-500">// Assert successful login</span>
<br/>
{'  '}<span className="text-pink-400">await</span> <span className="text-blue-400">expect</span>(page.<span className="text-blue-400">locator</span>(<span className="text-amber-300">'.dashboard-title'</span>)).<span className="text-blue-400">toBeVisible</span>();
<br/>
{'}'});
                  </code>
                </pre>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-6 bg-white border border-slate-200 p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 md:gap-4 z-10 max-w-[90%]">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0">
                <Check className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-slate-900 truncate">100% Tests Passed</p>
                <p className="text-[10px] md:text-xs text-slate-500 truncate">Execution time: 1.2s</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
