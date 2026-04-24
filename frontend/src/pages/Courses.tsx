import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter, BookOpen, Clock, Star, ArrowRight, GraduationCap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL, API_BASE_URL } from "../config";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
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
          Explore Our <span className="text-blue-600">Courses</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-lg"
        >
          Master any skill with industry-aligned curriculum designed to transform your career.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-2xl px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors font-semibold shadow-sm">
          <Filter className="w-5 h-5" /> Filter
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-24 text-slate-500 text-lg">
          No courses found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-xl hover:border-blue-200 transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                {course.thumbnail && course.thumbnail !== 'no-course-photo.jpg' ? (
                  <img 
                    src={(typeof course.thumbnail === 'string' && course.thumbnail.startsWith('http')) ? course.thumbnail : (typeof course.thumbnail === 'string' && !course.thumbnail.includes('[object Object]')) ? `${API_BASE_URL}/uploads/${course.thumbnail}` : '/no-course-photo.jpg'} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <GraduationCap className="w-16 h-16 text-slate-300" />
                )}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-full shadow-sm capitalize">
                    {course.level || "Beginner"}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{course.title}</h3>
                
                <div className="flex wrap items-center gap-4 text-sm text-slate-600 mb-6 font-medium">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-500" /> {course.duration || "Flexible"}</div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {course.rating || "0.0"}</div>
                  <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-500" /> {course.modules?.length || 0} Modules</div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">{course.price ? `₹${course.price}` : "Free"}</span>
                  <Link to={`/courses/${course.slug || course.id}`} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
