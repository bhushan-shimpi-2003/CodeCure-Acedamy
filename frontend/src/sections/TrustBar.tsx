import { motion } from "motion/react";

const tools = [
  "PLAYWRIGHT", "SELENIUM", "JAVASCRIPT", "NODE.JS", "GITHUB ACTIONS", "JENKINS", "DOCKER", "POSTMAN", "REST API", "PAGE OBJECT MODEL"
];

export default function TrustBar() {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
      
      <div className="flex w-max animate-marquee">
        {[...tools, ...tools, ...tools].map((tool, index) => (
          <div key={index} className="mx-8 flex items-center gap-4 text-slate-400">
            <span className="text-xl font-bold tracking-widest">{tool}</span>
            <span className="text-slate-300">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}
