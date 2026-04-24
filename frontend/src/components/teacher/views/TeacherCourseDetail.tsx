import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  ChevronLeft, 
  Users, 
  BookOpen, 
  Clock, 
  Star, 
  LayoutList, 
  GraduationCap, 
  Loader2,
  Mail,
  ExternalLink,
  Search
} from "lucide-react";
import { useAuth } from "../../../context/useAuth";

import { API_URL } from '../../../config';
const API = API_URL;

interface TeacherCourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export default function TeacherCourseDetail({ courseId, onBack }: TeacherCourseDetailProps) {
  const { token } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'students'>('content');
  const [studentSearch, setStudentSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch course details
        const courseRes = await fetch(`${API}/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const courseData = await courseRes.json();
        if (courseData.success) {
          setCourse(courseData.data);
        }

        // 2. Fetch enrollments for this course
        const enrollRes = await fetch(`${API}/teacher/course/${courseId}/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        if (enrollData.success) {
          setStudents(enrollData.data.map((s: any) => ({
            ...s,
            student_name: s.name || 'N/A',
            student_email: s.email || 'N/A',
            status: s.status || 'active'
          })));
        }
      } catch (err) {
        console.error("Error fetching course detail", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) fetchData();
  }, [courseId, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Course not found or access denied.</p>
        <button onClick={onBack} className="text-blue-600 flex items-center gap-2 mx-auto">
          <ChevronLeft className="w-4 h-4" /> Go back
        </button>
      </div>
    );
  }

  const filteredStudents = students.filter(s => 
    s.student_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.student_email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm group"
          >
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{course.title}</h1>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${course.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {course.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {course.level || "Intermediate"}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.open(`/courses/${course.slug || course.id}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4" /> Public Page
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
        >
          <LayoutList className="w-4 h-4" /> Content & Curriculum
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'students' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
        >
          <Users className="w-4 h-4" /> Enrolled Students ({students.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'content' ? (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left: Modules */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" /> Syllabus Overview
                </h3>
                <div className="space-y-4">
                  {course.modules?.map((mod: any, i: number) => (
                    <div key={mod.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Module {i+1}</span>
                        <span className="text-xs text-slate-400 font-medium">{mod.lessons?.length || 0} Lessons</span>
                      </div>
                      <h4 className="font-bold text-slate-900">{mod.title}</h4>
                    </div>
                  ))}
                  {(!course.modules || course.modules.length === 0) && (
                    <p className="text-slate-500 italic text-sm">No modules added to this course yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Duration</span>
                    <span className="text-sm font-bold text-slate-900">{course.duration_weeks || 0} Weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Price</span>
                    <span className="text-sm font-bold text-slate-900">₹{course.price || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="students"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filter students..." 
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No students found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                        <th className="pb-4 px-4 font-semibold">Name</th>
                        <th className="pb-4 px-4 font-semibold">Email</th>
                        <th className="pb-4 px-4 font-semibold">Enrollment Date</th>
                        <th className="pb-4 px-4 font-semibold">Status</th>
                        <th className="pb-4 px-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredStudents.map((s: any) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-bold text-slate-900 text-sm">{s.student_name}</td>
                          <td className="py-4 px-4 text-slate-600 text-sm">{s.student_email}</td>
                          <td className="py-4 px-4 text-slate-500 text-sm">{new Date(s.enrolled_at).toLocaleDateString()}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                              s.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <a href={`mailto:${s.student_email}`} className="text-blue-600 hover:text-blue-700">
                              <Mail className="w-4 h-4 inline" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
