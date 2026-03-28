import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, CheckSquare, XSquare, MoreVertical, Shield, X, Bell, Download, Plus } from "lucide-react";

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
 <div className="space-y-6 max-w-7xl mx-auto pb-12">
 <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
 <Users className="w-6 h-6 text-blue-600" /> Student Management
 </h1>
 <p className="text-slate-500 text-sm">Manage enrollments, progress, and access.</p>
 </div>
 <div className="flex gap-3">
 <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
 <Download className="w-4 h-4" /> Export CSV
 </button>
 <button className="flex items-center gap-2 bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
 <Plus className="w-4 h-4" /> Add Student
 </button>
 </div>
 </div>

 <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
 <div className="flex flex-col md:flex-row gap-4 mb-6">
 <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
 <Search className="w-4 h-4 text-slate-400" />
 <input 
 type="text" 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search by ID, Name, Email, or Course..." 
 className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400"
 />
 </div>
 <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
 <Filter className="w-4 h-4" /> Filter
 </button>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider bg-slate-50">
 <th className="p-4 font-semibold rounded-tl-lg">ID</th>
 <th className="p-4 font-semibold">Name</th>
 <th className="p-4 font-semibold">Course / Batch</th>
 <th className="p-4 font-semibold">Progress</th>
 <th className="p-4 font-semibold">Status</th>
 <th className="p-4 font-semibold text-right rounded-tr-lg">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
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
 className="hover:bg-slate-50 transition-colors group"
 >
 <td className="p-4 text-sm text-slate-500 font-medium">{student.id}</td>
 <td className="p-4 text-sm text-slate-900 font-medium">
 <div className="flex items-center gap-2">
 {student.name}
 {hasRequests && (
 <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold animate-pulse">
 <Bell className="w-3 h-3" /> Request
 </span>
 )}
 </div>
 </td>
 <td className="p-4">
 <div className="text-sm font-medium text-slate-700">{student.course}</div>
 <div className="text-xs text-slate-500">{student.batch}</div>
 </td>
 <td className="p-4">
 <div className="flex items-center gap-3">
 <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
 <div className="bg-blue-600 h-full rounded-full" style={{ width: `${student.progress}%` }}></div>
 </div>
 <span className="text-xs text-slate-600 font-medium">{student.progress}%</span>
 </div>
 </td>
 <td className="p-4">
 <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
 student.status === 'active' ? 'bg-green-100 text-green-700' :
 student.status === 'completed' ? 'bg-blue-100 text-blue-700' :
 student.status === 'pending' ? 'bg-amber-100 text-amber-700' :
 'bg-red-100 text-red-700'
 }`}>
 {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
 </span>
 </td>
 <td className="p-4 text-right">
 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
 <button 
 onClick={() => openAccessModal(student)}
 className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
 hasRequests 
 ? "bg-amber-100 text-amber-700 hover:bg-amber-200" 
 : "bg-slate-100 text-slate-700 hover:bg-slate-200"
 }`}
 title="Manage Course Access"
 >
 <Shield className="w-3.5 h-3.5" /> Access
 </button>
 {student.status === 'pending' && (
 <>
 <button className="p-1.5 text-slate-500 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"><CheckSquare className="w-4 h-4" /></button>
 <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"><XSquare className="w-4 h-4" /></button>
 </>
 )}
 <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><MoreVertical className="w-4 h-4" /></button>
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
 <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
 >
 <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
 <div>
 <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
 <Shield className="w-5 h-5 text-blue-600" /> Manage Access
 </h3>
 <p className="text-sm text-slate-500 mt-1">Student: <span className="font-medium text-slate-700">{selectedStudent.name}</span></p>
 </div>
 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="space-y-3 mb-8">
 <p className="text-sm font-medium text-slate-700 mb-3">Assign Courses & Video Access:</p>
 {availableCourses.map(course => {
 const isRequested = studentRequests.includes(course);
 const isAssigned = studentCourses.includes(course);
 
 return (
 <label 
 key={course} 
 className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
 isRequested && !isAssigned
 ? "border-amber-200 bg-amber-50 hover:border-amber-300" 
 : isAssigned 
 ? "border-blue-200 bg-blue-50"
 : "border-slate-200 bg-white hover:border-slate-300"
 }`}
 >
 <div className="flex items-center gap-3">
 <input 
 type="checkbox" 
 checked={isAssigned}
 onChange={() => toggleCourse(course)}
 className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
 />
 <span className={`text-sm font-medium ${isAssigned ? 'text-blue-900' : 'text-slate-700'}`}>{course}</span>
 </div>
 {isRequested && !isAssigned && (
 <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full animate-pulse">
 Requested
 </span>
 )}
 </label>
 );
 })}
 </div>

 <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
 <button 
 onClick={() => setIsModalOpen(false)}
 className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
 >
 Cancel
 </button>
 <button 
 onClick={saveAccess}
 className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
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
