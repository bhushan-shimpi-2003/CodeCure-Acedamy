import { motion } from "motion/react";

const tools = [
  "PLAYWRIGHT", "SELENIUM", "JAVASCRIPT", "NODE.JS", "GITHUB ACTIONS", "JENKINS", "DOCKER", "POSTMAN", "REST API", "PAGE OBJECT MODEL"
];

export default function TrustBar() {
  return (
    <section className="py-8 bg-emerald-950/20 border-y border-emerald-500/20 overflow-hidden relative font-mono">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
      
      <div className="flex w-max animate-marquee">
        {[...tools, ...tools, ...tools].map((tool, index) => (
          <div key={index} className="mx-8 flex items-center gap-4 text-emerald-500/50">
            <span className="text-xl font-bold tracking-widest">{tool}</span>
            <span className="text-emerald-500/20">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
