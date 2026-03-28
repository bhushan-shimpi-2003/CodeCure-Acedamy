import { motion } from "motion/react";
import { BookOpen, Edit, Eye, GraduationCap } from "lucide-react";

export default function TeacherClasses() {
  const courses = [
    { id: "CRS-01", title: "Playwright Master Program", batch: "Batch 4", progress: 65, modules: 8, students: 45 },
    { id: "CRS-02", title: "API Testing with Playwright", batch: "Batch 5", progress: 20, modules: 5, students: 38 },
  ];

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, i) => (
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
                <p className="text-sm text-blue-600 font-semibold mt-1">{course.batch}</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="pl-4 mb-6 space-y-5">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600">Course Completion</span>
                  <span className="text-slate-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="flex items-center gap-2">Modules: <span className="text-slate-900 font-bold">{course.modules}</span></span>
                <span className="flex items-center gap-2">Students: <span className="text-slate-900 font-bold">{course.students}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-4 border-t border-slate-100 pt-5">
              <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Eye className="w-4 h-4" /> View Modules
              </button>
              <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Edit className="w-4 h-4" /> Edit Curriculum
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
