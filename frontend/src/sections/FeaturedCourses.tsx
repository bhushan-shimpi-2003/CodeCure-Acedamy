import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, Clock, User, Award, GraduationCap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { API_URL, API_BASE_URL } from "../config";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();
        if (data.success) {
          // Take only first 3 for the home page
          setCourses(data.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch featured courses", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-24 relative bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span>Most Popular Programs</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Explore Our <span className="text-blue-600">Top-Rated</span> Courses
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Choose from a wide variety of industry-standard courses designed to level up your career instantly.
            </p>
          </div>
          <Link to="/courses">
            <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-2 group transition-all">
              View All Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 italic">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-blue-200 transition-all flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {course.thumbnail && course.thumbnail !== 'no-course-photo.jpg' ? (
                    <img 
                      src={(typeof course.thumbnail === 'string' && course.thumbnail.startsWith('http')) ? course.thumbnail : (typeof course.thumbnail === 'string' && !course.thumbnail.includes('[object Object]')) ? `${API_BASE_URL}/uploads/${course.thumbnail}` : '/no-course-photo.jpg'} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <GraduationCap className="w-20 h-20 text-slate-300" />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-white/20 shadow-sm">
                    {course.level || "Advanced"}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Certified Program</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">{course.title}</h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {course.description || "Master industry-standard tools and techniques used by top tech companies worldwide."}
                  </p>
                  
                  <div className="mt-auto space-y-6">
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-500">{course.duration_weeks || 12} Weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-500">2.4k Students</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-slate-900">
                        ₹{course.price || "Free"}
                      </div>
                      <Link to={`/courses/${course.slug || course.id}`}>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
