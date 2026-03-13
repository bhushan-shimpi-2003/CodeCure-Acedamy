import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Folder, FolderOpen, FileCode2, Terminal } from "lucide-react";

const modules = [
  {
    title: "01_Testing_Fundamentals",
    topics: ["SDLC & STLC.md", "Manual_testing_basics.txt", "Agile_Scrum.pdf", "Test_case_design.xlsx"]
  },
  {
    title: "02_JavaScript_for_Automation",
    topics: ["variables_functions.js", "async_await.js", "dom_handling.js", "es6_features.js"]
  },
  {
    title: "03_Playwright_Core",
    topics: ["installation.sh", "locators.ts", "actions.ts", "assertions.ts"]
  },
  {
    title: "04_Advanced_Playwright",
    topics: ["fixtures.ts", "parallel_execution.config", "retry_logic.ts", "data_driven.json"]
  },
  {
    title: "05_Framework_Development",
    topics: ["page_object_model.ts", "hybrid_framework.ts", "custom_logger.ts", "allure_report.config"]
  },
  {
    title: "06_API_Automation",
    topics: ["rest_concepts.md", "playwright_api.ts", "mocking.ts", "postman_collection.json"]
  },
  {
    title: "07_CI_CD_Integration",
    topics: ["github_actions.yml", "jenkinsfile", "pipeline.sh", "dockerfile"]
  },
  {
    title: "08_Real_Time_Project",
    topics: ["ecommerce_framework.ts", "dashboard_automation.ts", "e2e_scenarios.ts", "code_review.md"]
  },
  {
    title: "09_Interview_Preparation",
    topics: ["200_questions.pdf", "selenium_vs_playwright.md", "live_coding.js", "system_design.drawio"]
  },
  {
    title: "10_Job_Support",
    topics: ["resume_template.docx", "linkedin_optimization.md", "mock_interviews.mp4", "referrals.txt"]
  }
];

export default function Curriculum() {
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <section id="curriculum" className="py-24 relative font-mono">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-4">
            <Terminal className="w-4 h-4" />
            <span>ls -la ./12_week_program</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            Source <span className="text-emerald-500">Code</span>
          </h2>
          <p className="text-lg text-slate-400">
            A step-by-step roadmap from manual testing basics to advanced framework development and CI/CD integration.
          </p>
        </div>

        <div className="border border-emerald-500/30 bg-[#0a0a0a] rounded-none shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/30">
            <div className="text-emerald-500/70 text-xs">coducure-academy-repo</div>
          </div>
          <div className="p-4 space-y-1">
            {modules.map((mod, index) => (
              <div key={index} className="text-sm">
                <button
                  onClick={() => setOpenModule(openModule === index ? null : index)}
                  className="w-full flex items-center gap-2 p-2 text-left hover:bg-emerald-500/10 transition-colors text-emerald-400"
                >
                  {openModule === index ? (
                    <FolderOpen className="w-4 h-4 shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 shrink-0" />
                  )}
                  <span>{mod.title}</span>
                </button>
                <AnimatePresence>
                  {openModule === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 py-2 border-l border-emerald-500/20 ml-4 space-y-2">
                        {mod.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer">
                            <FileCode2 className="w-4 h-4 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
