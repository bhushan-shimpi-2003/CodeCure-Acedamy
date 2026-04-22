import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Search, Mail, GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/useAuth";

import { API_URL } from "../../../config";
const API = API_URL;

export default function TeacherStudents() {
  const { token } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      // Teachers can see enrollments through the courses they teach
      // We'll use the admin students endpoint if teacher has access, 
      // otherwise we fetch enrollments for their courses
      const coursesRes = await fetch(`${API}/courses/teacher/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const coursesData = await coursesRes.json();
      
      if (coursesData.success && coursesData.data.length > 0) {
        // Fetch all enrollments for teacher's courses
        const allStudents: any[] = [];
        for (const course of coursesData.data) {
          try {
            // Use admin enrollments endpoint if accessible, or we gather from course context
            const enrollRes = await fetch(`${API}/enrollments`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const enrollData = await enrollRes.json();
            if (enrollData.success) {
              enrollData.data.forEach((e: any) => {
                if (e.course_id === course.id && !allStudents.find(s => s.student_id === e.student_id)) {
                  allStudents.push({
                    ...e,
                    course_title: e.courses?.title || course.title,
                    student_name: e.profiles?.name || 'N/A',
                    student_email: e.profiles?.email || 'N/A',
                  });
                }
              });
            }
          } catch {
            // If teacher can't access enrollments, that's okay
          }
        }
        setStudents(allStudents);
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      (s.student_name || "").toLowerCase().includes(q) ||
      (s.student_email || "").toLowerCase().includes(q) ||
      (s.course_title || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Student List
          </h1>
          <p className="text-slate-500 text-sm">Directory of enrolled students.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center p-12 text-slate-500">
            {students.length === 0 ? "No students enrolled in your courses yet." : "No students match your search."}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-3">Course</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Student List */}
            <div className="flex flex-col gap-3 md:gap-0 md:divide-y md:divide-slate-100">
              {filteredStudents.map((student: any) => (
                <div key={student.id || student.student_id} className="relative bg-slate-50 md:bg-transparent p-4 rounded-2xl border border-slate-200 md:border-transparent md:rounded-none md:p-4 hover:bg-slate-50 transition-colors flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  
                  {/* Name */}
                  <div className="md:col-span-3 mb-1 md:mb-0">
                    <span className="md:hidden text-xs text-slate-500 uppercase font-semibold mb-1 block">Name</span>
                    <span className="text-sm text-slate-900 font-bold">{student.student_name || 'N/A'}</span>
                  </div>

                  {/* Email */}
                  <div className="md:col-span-3 mb-3 md:mb-0">
                    <span className="text-sm text-slate-500">{student.student_email || 'N/A'}</span>
                  </div>

                  {/* Course */}
                  <div className="md:col-span-3 flex items-center justify-between md:block mb-3 md:mb-0">
                    <span className="md:hidden text-xs text-slate-500 uppercase font-semibold">Course</span>
                    <span className="text-sm text-blue-600 font-bold md:font-medium">{student.course_title || 'N/A'}</span>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2 flex items-center justify-between md:block mb-4 md:mb-0">
                    <span className="md:hidden text-xs text-slate-500 uppercase font-semibold">Status</span>
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-lg border inline-block ${
                      student.student_status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {student.student_status || 'unknown'}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="md:col-span-1 border-t border-slate-200 pt-3 md:border-none md:pt-0 flex justify-end">
                    <a 
                      href={`mailto:${student.student_email || ''}`}
                      className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-4 py-2 md:px-3 md:py-1.5 rounded-xl md:rounded-lg text-sm font-bold md:font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Mail className="w-4 h-4" /> <span className="md:hidden">Contact Student</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
