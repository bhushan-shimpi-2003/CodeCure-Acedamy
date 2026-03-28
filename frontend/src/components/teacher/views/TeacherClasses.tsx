import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen, Eye, GraduationCap, Loader2, Users } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherClasses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/courses/teacher/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Assigned Courses
          </h1>
          <p className="text-slate-500 text-sm">Track module progress and curriculum.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          No courses assigned yet. Contact admin to be assigned a course.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course: any, i: number) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 relative group hover:border-blue-300 transition-colors shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-100 group-hover:bg-blue-500 transition-colors"></div>
              <div className="flex justify-between items-start mb-6 pl-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{course.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold mt-1">{course.status === 'published' ? 'Published' : 'Draft'}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="pl-4 mb-6 space-y-5">
                {course.description && (
                  <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                )}
                <div className="flex items-center gap-6 text-sm font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> 
                    Status: <span className="text-slate-900 font-bold capitalize">{course.status || 'draft'}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    Price: <span className="text-slate-900 font-bold">{course.price ? `₹${course.price}` : 'Free'}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-4 border-t border-slate-100 pt-5">
                <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Eye className="w-4 h-4" /> View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
