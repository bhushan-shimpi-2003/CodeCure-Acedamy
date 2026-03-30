import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Star, BookOpen, CheckCircle, Play, Shield, ArrowRight, ChevronLeft, GraduationCap, LayoutList, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { API_URL, API_BASE_URL } from "../config";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/courses/${id}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Failed to fetch course", err);
        setError("Failed to load course details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-20 px-4 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="pt-24 pb-20 px-4 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{error || "Course not found"}</h2>
        <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-semibold underline">
          Return to course catalog
        </Link>
      </div>
    );
  }

  // Fallbacks for optional fields
  const level = course.level || "Advanced";
  const duration = course.duration_weeks ? `${course.duration_weeks} Weeks` : "Flexible";
  const price = course.price ? `₹${course.price}` : "Free";
  const rating = 4.9;
  const students = 1240;
  const features = [
    "Detailed Video Content",
    "Real-world Project Implementation",
    "Doubt Resolution",
    "Lifetime Access to Material"
  ];

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
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 capitalize"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{level} Track</span>
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
              className="text-slate-600 text-lg leading-relaxed whitespace-pre-line"
            >
              {course.description || "No description provided."}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-8 py-8 border-y border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Duration</div>
                <div className="text-base text-slate-900 font-bold">{duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Rating</div>
                <div className="text-base text-slate-900 font-bold">{rating}/5.0</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">Enrolled</div>
                <div className="text-base text-slate-900 font-bold">{students}+</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <LayoutList className="w-6 h-6 text-blue-600" /> Course Curriculum
            </h2>
            <div className="space-y-4">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((mod: any, i: number) => (
                  <div key={mod.id || i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 hover:border-blue-200 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center font-bold text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {i + 1 < 10 ? `0${i+1}` : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-700 font-bold group-hover:text-slate-900 transition-colors">{mod.title}</div>
                      {mod.duration && <div className="text-xs text-slate-400 mt-1 font-medium">{mod.duration}</div>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 italic">Curriculum details are being finalized. Check back soon!</p>
                </div>
              )}
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
            <div className="relative h-56 overflow-hidden bg-slate-100 flex items-center justify-center">
              {course.thumbnail && course.thumbnail !== 'no-course-photo.jpg' ? (
                <>
                  <img 
                    src={course.thumbnail.startsWith('http') ? course.thumbnail : `${API_BASE_URL}/uploads/${course.thumbnail}`} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 group cursor-pointer hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-blue-600 ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <GraduationCap className="w-20 h-20 text-slate-300" />
              )}
            </div>
            
            <div className="p-8">
              <div className="text-4xl font-bold text-slate-900 mb-8">{price}</div>
              
              <Link to="/checkout" className="block w-full">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mb-6 hover:scale-[1.02]">
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">This course includes:</h3>
                {features.map((feature, i) => (
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
