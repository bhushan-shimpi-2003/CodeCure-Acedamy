import { motion } from "motion/react";
import { Users, Search, Filter, Mail, GraduationCap } from "lucide-react";

export default function TeacherStudents() {
  const students = [
    { id: "STD-001", name: "Alex Developer", email: "alex@example.com", course: "Playwright Automation" },
    { id: "STD-002", name: "Sarah Connor", email: "sarah@example.com", course: "Playwright Automation" },
    { id: "STD-003", name: "John Smith", email: "john@example.com", course: "Cypress Masterclass" },
    { id: "STD-004", name: "Emma Watson", email: "emma@example.com", course: "Selenium WebDriver" },
    { id: "STD-005", name: "Michael Chang", email: "michael@example.com", course: "Playwright Automation" },
  ];

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
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-semibold shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student, i) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-500 font-medium">{student.id}</td>
                  <td className="p-4 text-sm text-slate-900 font-semibold">{student.name}</td>
                  <td className="p-4 text-sm text-slate-600">{student.email}</td>
                  <td className="p-4 text-sm text-blue-600 font-medium">{student.course}</td>
                  <td className="p-4 text-right">
                    <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ml-auto shadow-sm">
                      <Mail className="w-4 h-4" /> Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
