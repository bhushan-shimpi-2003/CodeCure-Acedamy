import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, CheckSquare, XSquare, MoreVertical, Terminal, Shield, X, Bell } from "lucide-react";

export default function StudentManagement() {
  const [students, setStudents] = useState([
    { id: "STD_001", name: "Alex Developer (Demo User)", email: "alex@example.com", course: "Playwright Master", batch: "B4", progress: 42, status: "active" },
    { id: "STD_002", name: "Sarah Connor", email: "sarah@example.com", course: "Playwright Master", batch: "B4", progress: 85, status: "active" },
    { id: "STD_003", name: "John Smith", email: "john@example.com", course: "Selenium Pro", batch: "B3", progress: 100, status: "completed" },
    { id: "STD_004", name: "Emma Watson", email: "emma@example.com", course: "API Testing", batch: "B5", progress: 0, status: "pending" },
    { id: "STD_005", name: "Michael Chang", email: "michael@example.com", course: "Playwright Master", batch: "B4", progress: 12, status: "inactive" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentCourses, setStudentCourses] = useState<string[]>([]);
  const [studentRequests, setStudentRequests] = useState<string[]>([]);
  const [globalRequests, setGlobalRequests] = useState<Record<string, string[]>>({});

  const availableCourses = ["Playwright Master", "Selenium Pro", "API Testing", "React Masterclass"];

  useEffect(() => {
    // Load all requests across all students to show indicators
    const requests: Record<string, string[]> = {};
    students.forEach(s => {
      const saved = localStorage.getItem(`requested_courses_${s.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          requests[s.id] = parsed;
        }
      }
    });
    setGlobalRequests(requests);
  }, [students]);

  const openAccessModal = (student: any) => {
    setSelectedStudent(student);
    
    // Load assigned courses
    const savedAssigned = localStorage.getItem(`assigned_courses_${student.id}`);
    if (savedAssigned) {
      setStudentCourses(JSON.parse(savedAssigned));
    } else {
      setStudentCourses([student.course]);
    }

    // Load requested courses
    const savedRequests = localStorage.getItem(`requested_courses_${student.id}`);
    if (savedRequests) {
      setStudentRequests(JSON.parse(savedRequests));
    } else {
      setStudentRequests([]);
    }

    setIsModalOpen(true);
  };

  const toggleCourse = (course: string) => {
    setStudentCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  const saveAccess = () => {
    if (selectedStudent) {
      // Save assigned courses
      localStorage.setItem(`assigned_courses_${selectedStudent.id}`, JSON.stringify(studentCourses));
      
      // Remove approved courses from requests
      const remainingRequests = studentRequests.filter(req => !studentCourses.includes(req));
      localStorage.setItem(`requested_courses_${selectedStudent.id}`, JSON.stringify(remainingRequests));
      
      // Update global requests state
      setGlobalRequests(prev => ({
        ...prev,
        [selectedStudent.id]: remainingRequests
      }));

      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Student_Mgmt
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Manage enrollments, progress, and access.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#050505] border border-emerald-500 text-emerald-500 px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-900/30 transition-colors">
            Export_CSV
          </button>
          <button className="bg-emerald-500 border border-emerald-500 text-black px-4 py-2 rounded-none text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            Add_Student
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 focus-within:border-emerald-500 transition-colors">
            <Search className="w-4 h-4 text-emerald-600" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name, Email, or Course..." 
              className="bg-transparent border-none outline-none text-sm text-emerald-400 w-full placeholder:text-emerald-900"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 text-emerald-500 hover:bg-emerald-900/30 transition-colors text-sm font-bold uppercase">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-500/30 text-emerald-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Course / Batch</th>
                <th className="p-4 font-bold">Progress</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30">
              {students
                .filter(student => {
                  const query = searchQuery.toLowerCase();
                  return (
                    student.name.toLowerCase().includes(query) ||
                    student.id.toLowerCase().includes(query) ||
                    student.course.toLowerCase().includes(query) ||
                    (student.email && student.email.toLowerCase().includes(query))
                  );
                })
                .map((student, i) => {
                const hasRequests = globalRequests[student.id] && globalRequests[student.id].length > 0;
                return (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-emerald-950/20 transition-colors group"
                  >
                    <td className="p-4 text-sm text-emerald-500 font-bold">{student.id}</td>
                    <td className="p-4 text-sm text-white font-bold">
                      <div className="flex items-center gap-2">
                        {student.name}
                        {hasRequests && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] uppercase font-bold animate-pulse">
                            <Bell className="w-3 h-3" /> Request
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-emerald-200">{student.course}</div>
                      <div className="text-xs text-emerald-600">{student.batch}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#111] border border-emerald-900 h-1.5">
                          <div className="bg-emerald-500 h-full" style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        student.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        student.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                        student.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openAccessModal(student)}
                          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase transition-colors border ${
                            hasRequests 
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/50 hover:bg-amber-500/20" 
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          }`}
                          title="Manage Course Access"
                        >
                          <Shield className="w-3 h-3" /> Access
                        </button>
                        {student.status === 'pending' && (
                          <>
                            <button className="p-1 text-emerald-500 hover:bg-emerald-500/20"><CheckSquare className="w-4 h-4" /></button>
                            <button className="p-1 text-red-500 hover:bg-red-500/20"><XSquare className="w-4 h-4" /></button>
                          </>
                        )}
                        <button className="p-1 text-slate-400 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Access Management Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-emerald-500/50 p-6 max-w-md w-full shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <div className="flex justify-between items-center mb-6 border-b border-emerald-500/30 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" /> Manage Access
                </h3>
                <p className="text-xs text-emerald-500 mt-1 uppercase">Student: {selectedStudent.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-emerald-500 hover:text-emerald-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-emerald-400 uppercase mb-2">Assign Courses & Video Access:</p>
              {availableCourses.map(course => {
                const isRequested = studentRequests.includes(course);
                const isAssigned = studentCourses.includes(course);
                
                return (
                  <label 
                    key={course} 
                    className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                      isRequested && !isAssigned
                        ? "border-amber-500/50 bg-amber-500/5 hover:border-amber-400" 
                        : "border-emerald-900/50 bg-[#050505] hover:border-emerald-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={isAssigned}
                        onChange={() => toggleCourse(course)}
                        className="w-4 h-4 accent-emerald-500 bg-black border-emerald-500"
                      />
                      <span className="text-sm text-white font-bold">{course}</span>
                    </div>
                    {isRequested && !isAssigned && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/30 animate-pulse">
                        Requested
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-emerald-500/30">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-emerald-900 text-emerald-500 hover:bg-emerald-900/30 text-xs font-bold uppercase transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveAccess}
                className="px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold uppercase transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              >
                Save Access
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
