import { motion } from "motion/react";
import { Search, Filter, BookOpen, Clock, Star, ArrowRight, GraduationCap } from "lucide-react";
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
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Course Catalog</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          Master <span className="text-blue-600">Automation</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-lg"
        >
          Industry-aligned curriculum designed to transform you into a top-tier SDET.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors font-semibold shadow-sm">
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
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-xl hover:border-blue-200 transition-all flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-full shadow-sm">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{course.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6 font-medium">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-500" /> {course.duration}</div>
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {course.rating}</div>
                <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-500" /> {course.students}</div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                <Link to={`/courses/${course.id}`} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
