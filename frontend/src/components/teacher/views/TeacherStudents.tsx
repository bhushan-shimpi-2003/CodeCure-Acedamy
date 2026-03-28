import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Search, Mail, GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

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
                  allStudents.push({ ...e, course_title: course.title });
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Course</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student: any) => (
                  <tr key={student.id || student.student_id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-900 font-semibold">{student.student_name || 'N/A'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.student_email || 'N/A'}</td>
                    <td className="p-4 text-sm text-blue-600 font-medium">{student.course_title || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-lg border ${
                        student.student_status === 'active' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {student.student_status || 'unknown'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`mailto:${student.student_email || ''}`}
                        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-sm"
                      >
                        <Mail className="w-4 h-4" /> Contact
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
