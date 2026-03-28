import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2 } from "lucide-react";

const modules = [
  {
    title: "Module 1: Testing Fundamentals",
    topics: ["SDLC & STLC", "Manual Testing Basics", "Agile & Scrum Methodologies", "Test Case Design & Execution"]
  },
  {
    title: "Module 2: JavaScript for Automation",
    topics: ["Variables, Data Types & Functions", "Asynchronous Programming (Promises, Async/Await)", "DOM Manipulation & Event Handling", "ES6+ Features"]
  },
  {
    title: "Module 3: Playwright Core Concepts",
    topics: ["Environment Setup & Installation", "Locators & Selectors Strategy", "Handling User Actions (Click, Type, Hover)", "Assertions & Validations"]
  },
  {
    title: "Module 4: Advanced Playwright Features",
    topics: ["Test Fixtures & Hooks", "Parallel Execution & Configuration", "Retry Logic & Flaky Tests Handling", "Data-Driven Testing"]
  },
  {
    title: "Module 5: Framework Development",
    topics: ["Page Object Model (POM) Design Pattern", "Building a Hybrid Framework", "Custom Logger Implementation", "Allure Reporting Integration"]
  },
  {
    title: "Module 6: API Automation",
    topics: ["REST API Concepts & Methods", "Automating APIs with Playwright", "Mocking & Intercepting Network Requests", "Postman Collection Integration"]
  },
  {
    title: "Module 7: CI/CD Integration",
    topics: ["GitHub Actions Workflows", "Jenkins Pipeline Setup", "Shell Scripting Basics", "Dockerizing Tests"]
  },
  {
    title: "Module 8: Real-Time Project",
    topics: ["E-commerce End-to-End Automation", "Dashboard & Analytics Testing", "Complex Scenarios Implementation", "Code Review Best Practices"]
  },
  {
    title: "Module 9: Interview Preparation",
    topics: ["Top 200+ Interview Questions", "Selenium vs Playwright Comparisons", "Live Coding Practice Sessions", "System Design for QA"]
  },
  {
    title: "Module 10: Job Support",
    topics: ["Resume Building & Review", "LinkedIn Profile Optimization", "Mock Interviews with Feedback", "Direct Referrals & Placement Assistance"]
  }
];

export default function Curriculum() {
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <section id="curriculum" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>12-Week Comprehensive Program</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Course <span className="text-blue-600">Curriculum</span>
          </h2>
          <p className="text-lg text-slate-600">
            A step-by-step roadmap from manual testing basics to advanced framework development and CI/CD integration.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {modules.map((mod, index) => (
              <div key={index} className="bg-white">
                <button
                  onClick={() => setOpenModule(openModule === index ? null : index)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors ${openModule === index ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                >
                  <span className={`font-semibold text-lg ${openModule === index ? 'text-blue-600' : 'text-slate-900'}`}>{mod.title}</span>
                  {openModule === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openModule === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50"
                    >
                      <div className="p-5 pt-0 space-y-3">
                        {mod.topics.map((topic, i) => (
                          <div key={i} className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
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
