import { motion } from "motion/react";
import { Terminal, Clock, Star, BookOpen, CheckCircle, Play, Shield, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  
  // Mock data based on ID
  const course = {
    title: id?.split('-').join(' ').toUpperCase() || "PLAYWRIGHT MASTER PROGRAM",
    description: "Master modern web automation with Playwright. Learn to build robust, scalable, and fast test automation frameworks from scratch.",
    level: "Advanced",
    duration: "12 Weeks",
    rating: 4.9,
    students: 1240,
    price: "₹15,000",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    modules: [
      "Introduction to Playwright & Setup",
      "Core Concepts & Locators",
      "Handling Complex Web Elements",
      "API Testing with Playwright",
      "Framework Design (Page Object Model)",
      "CI/CD Integration (GitHub Actions)",
      "Dockerizing Playwright Tests",
      "Mock Interviews & Resume Prep"
    ],
    features: [
      "100+ Hours of Video Content",
      "Real-world Project Implementation",
      "1-on-1 Doubt Resolution",
      "Placement Assistance",
      "Lifetime Access to Recordings"
    ]
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto font-mono">
      <div className="mb-8">
        <Link to="/courses" className="text-emerald-500 hover:text-emerald-400 text-sm font-bold uppercase flex items-center gap-2 transition-colors">
          &lt; Back_To_Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Terminal className="w-4 h-4" />
              <span>{course.level}_Track</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight"
            >
              {course.title}<span className="text-emerald-500">_</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg leading-relaxed"
            >
              {course.description}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-6 py-6 border-y border-emerald-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a0a0a] border border-emerald-500/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Duration</div>
                <div className="text-sm text-emerald-400 font-bold uppercase">{course.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a0a0a] border border-emerald-500/30 flex items-center justify-center">
                <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Rating</div>
                <div className="text-sm text-emerald-400 font-bold uppercase">{course.rating}/5.0</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0a0a0a] border border-emerald-500/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Enrolled</div>
                <div className="text-sm text-emerald-400 font-bold uppercase">{course.students}+</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" /> SYS_Curriculum
            </h2>
            <div className="space-y-4">
              {course.modules.map((mod, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-emerald-900/50 p-4 flex items-center gap-4 hover:border-emerald-500/50 transition-colors">
                  <div className="w-8 h-8 bg-[#050505] border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-xs">
                    {i + 1 < 10 ? `0${i+1}` : i + 1}
                  </div>
                  <div className="text-slate-300 text-sm uppercase font-bold">{mod}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0a0a0a] border border-emerald-500/50 rounded-none sticky top-24"
          >
            <div className="relative h-48 overflow-hidden border-b border-emerald-500/30">
              <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10"></div>
              <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 bg-[#050505]/80 border border-emerald-500 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 transition-colors group">
                  <Play className="w-6 h-6 text-emerald-500 group-hover:text-emerald-400 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-3xl font-bold text-emerald-400 mb-6">{course.price}</div>
              
              <Link to="/checkout" className="block w-full">
                <button className="w-full bg-emerald-500 text-black py-4 font-bold uppercase hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 mb-4">
                  INIT_ENROLLMENT <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              <div className="space-y-4 pt-4 border-t border-emerald-900/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase">Course_Includes:</h3>
                {course.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 uppercase">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-900/50 flex items-center justify-center gap-2 text-[10px] text-emerald-600 font-bold uppercase">
                <Shield className="w-3.5 h-3.5" /> Secure_Encrypted_Checkout
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
