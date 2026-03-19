import { motion } from "motion/react";
import { Terminal, Search, Filter, BookOpen, Clock, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Courses() {
  const courses = [
    { id: "playwright-master", title: "Playwright Master Program", level: "Advanced", duration: "12 Weeks", rating: 4.9, students: 1240, price: "₹15,000", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" },
    { id: "selenium-pro", title: "Selenium Automation Pro", level: "Intermediate", duration: "10 Weeks", rating: 4.8, students: 850, price: "₹12,000", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" },
    { id: "api-testing", title: "API Testing Fundamentals", level: "Beginner", duration: "6 Weeks", rating: 4.7, students: 2100, price: "₹8,000", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: "cypress-expert", title: "Cypress Expert Track", level: "Advanced", duration: "8 Weeks", rating: 4.9, students: 920, price: "₹14,000", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" },
    { id: "java-sdet", title: "Java for SDETs", level: "Beginner", duration: "8 Weeks", rating: 4.8, students: 1560, price: "₹10,000", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800" },
    { id: "ci-cd-pipelines", title: "CI/CD Pipeline Mastery", level: "Intermediate", duration: "4 Weeks", rating: 4.9, students: 780, price: "₹6,000", image: "https://images.unsplash.com/photo-1618401471353-b98a5233c591?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto font-mono">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Terminal className="w-4 h-4" />
          <span>Course_Catalog</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight"
        >
          Master_Automation<span className="text-emerald-500">.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto text-lg"
        >
          Industry-aligned curriculum designed to transform you into a top-tier SDET.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 flex items-center gap-2 bg-[#0a0a0a] border border-emerald-500/30 px-4 py-3 focus-within:border-emerald-500 transition-colors">
          <Search className="w-5 h-5 text-emerald-600" />
          <input 
            type="text" 
            placeholder="grep -r 'course_name'..." 
            className="bg-transparent border-none outline-none text-emerald-400 w-full placeholder:text-emerald-900"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#0a0a0a] border border-emerald-500/30 px-6 py-3 text-emerald-500 hover:bg-emerald-900/30 transition-colors font-bold uppercase">
          <Filter className="w-5 h-5" /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none overflow-hidden group hover:border-emerald-400 transition-colors flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10"></div>
              <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-2 py-1 bg-[#050505]/90 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase backdrop-blur-sm">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 uppercase group-hover:text-emerald-400 transition-colors">{course.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6 uppercase font-bold">
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {course.duration}</div>
                <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> {course.rating}</div>
                <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-emerald-500" /> {course.students}</div>
              </div>

              <div className="mt-auto pt-6 border-t border-emerald-900/50 flex items-center justify-between">
                <span className="text-xl font-bold text-emerald-400">{course.price}</span>
                <Link to={`/courses/${course.id}`} className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  View_Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
