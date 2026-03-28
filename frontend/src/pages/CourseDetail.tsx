import { motion } from "motion/react";
import { Clock, Star, BookOpen, CheckCircle, Play, Shield, ArrowRight, ChevronLeft, GraduationCap, LayoutList } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  
  // Mock data based on ID
  const course = {
    title: id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Playwright Master Program",
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
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2 transition-colors w-fit">
          <ChevronLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{course.level} Track</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              {course.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed"
            >
              {course.description}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-8 py-8 border-y border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Duration</div>
                <div className="text-base text-slate-900 font-bold">{course.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Rating</div>
                <div className="text-base text-slate-900 font-bold">{course.rating}/5.0</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Enrolled</div>
                <div className="text-base text-slate-900 font-bold">{course.students}+</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <LayoutList className="w-6 h-6 text-blue-600" /> Course Curriculum
            </h2>
            <div className="space-y-4">
              {course.modules.map((mod, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center font-bold text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {i + 1 < 10 ? `0${i+1}` : i + 1}
                  </div>
                  <div className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{mod}</div>
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
            className="bg-white border border-slate-200 rounded-3xl shadow-xl sticky top-24 overflow-hidden"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 group cursor-pointer hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 bg-white/90 rounded-full backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-6 h-6 text-blue-600 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-4xl font-bold text-slate-900 mb-8">{course.price}</div>
              
              <Link to="/checkout" className="block w-full">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mb-6 hover:scale-[1.02]">
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">This course includes:</h3>
                {course.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <Shield className="w-4 h-4" /> Secure Encrypted Checkout
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
