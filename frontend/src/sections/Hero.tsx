import { motion } from "motion/react";
import { BookOpen, ChevronRight, PlayCircle, Users, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span>Enrollment Open for Spring 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Master Software Testing & <span className="text-blue-600">Automation</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Join our intensive 12-week program. Learn modern tools like Playwright and Selenium, build real-world projects, and launch your career as an SDET.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base h-14 px-8 bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/20 group">
                  Explore Programs
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/courses" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full">
                  <PlayCircle className="mr-2 w-5 h-5 text-blue-600" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium text-slate-600">Trusted by 2,000+ students</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Students learning coding" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badges */}
              <div className="absolute top-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Completion Rate</p>
                  <p className="text-lg font-bold text-slate-900">94%</p>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Active Learners</p>
                  <p className="text-lg font-bold text-slate-900">1,200+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
