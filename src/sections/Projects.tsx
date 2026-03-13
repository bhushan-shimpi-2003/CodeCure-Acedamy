import { motion } from "motion/react";
import { Terminal, Server, GitBranch } from "lucide-react";

const projects = [
  {
    icon: Terminal,
    title: "ecommerce_automation.exe",
    desc: "End-to-end UI automation of a complex e-commerce platform including cart, checkout, and payment flows using Playwright and POM.",
    tags: ["Playwright", "POM", "UI Testing"]
  },
  {
    icon: Server,
    title: "rest_api_framework.sh",
    desc: "Build a robust API testing framework to validate endpoints, handle authentication tokens, and perform schema validation.",
    tags: ["API Testing", "JSON", "Assertions"]
  },
  {
    icon: GitBranch,
    title: "ci_cd_pipeline.yml",
    desc: "Set up automated test execution on GitHub Actions running tests in parallel across multiple browsers on every pull request.",
    tags: ["GitHub Actions", "Docker", "Reporting"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative border-y border-emerald-500/20 bg-emerald-950/5 font-mono">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            Executable <span className="text-emerald-500">Modules</span>
          </h2>
          <p className="text-lg text-slate-400">
            Stop watching tutorials and start coding. You will build industry-standard projects that you can showcase on your resume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] rounded-none p-8 border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
              <div className="bg-emerald-500/10 w-14 h-14 rounded-none flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors border border-emerald-500/30">
                <project.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-4">{project.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-sm">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 bg-emerald-950/50 text-emerald-400 border border-emerald-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
