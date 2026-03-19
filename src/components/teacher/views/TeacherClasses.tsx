import { motion } from "motion/react";
import { BookOpen, Terminal, Edit, Plus, Eye } from "lucide-react";

export default function TeacherClasses() {
  const courses = [
    { id: "CRS_01", title: "Playwright Master Program", batch: "Batch 4", progress: 65, modules: 8, students: 45 },
    { id: "CRS_02", title: "API Testing with Playwright", batch: "Batch 5", progress: 20, modules: 5, students: 38 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Assigned_Courses
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Track module progress and curriculum.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 relative group hover:border-emerald-400 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
            <div className="flex justify-between items-start mb-4 pl-2">
              <div>
                <h3 className="font-bold text-white text-lg uppercase">{course.title}</h3>
                <p className="text-xs text-emerald-500 font-bold uppercase">{course.batch}</p>
              </div>
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            
            <div className="pl-2 mb-6 space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase">
                  <span className="text-emerald-600">Course_Completion</span>
                  <span className="text-emerald-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-[#111] border border-emerald-900 h-1.5">
                  <div className="bg-emerald-500 h-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-emerald-600 font-bold uppercase">
                <span>Modules: <span className="text-emerald-400">{course.modules}</span></span>
                <span>Students: <span className="text-emerald-400">{course.students}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2 border-t border-emerald-900/50 pt-4">
              <button className="flex-1 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2">
                <Eye className="w-3.5 h-3.5" /> View_Modules
              </button>
              <button className="flex-1 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1.5 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2">
                <Edit className="w-3.5 h-3.5" /> Edit_Curriculum
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
