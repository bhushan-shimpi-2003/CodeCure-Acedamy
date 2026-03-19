import { motion } from "motion/react";
import { Users, Terminal, Search, Filter, Mail } from "lucide-react";

export default function TeacherStudents() {
  const students = [
    { id: "STD_001", name: "Alex Developer", email: "alex@example.com", course: "Playwright Automation" },
    { id: "STD_002", name: "Sarah Connor", email: "sarah@example.com", course: "Playwright Automation" },
    { id: "STD_003", name: "John Smith", email: "john@example.com", course: "Cypress Masterclass" },
    { id: "STD_004", name: "Emma Watson", email: "emma@example.com", course: "Selenium WebDriver" },
    { id: "STD_005", name: "Michael Chang", email: "michael@example.com", course: "Playwright Automation" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Student_List
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Directory of enrolled students.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-[#050505] border border-emerald-500/30 px-4 py-2 focus-within:border-emerald-500 transition-colors">
            <Search className="w-4 h-4 text-emerald-600" />
            <input 
              type="text" 
              placeholder="Search student..." 
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
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Course</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30">
              {students.map((student, i) => (
                <tr key={student.id} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="p-4 text-xs text-emerald-500 font-bold">{student.id}</td>
                  <td className="p-4 text-sm text-white font-bold">{student.name}</td>
                  <td className="p-4 text-sm text-emerald-200">{student.email}</td>
                  <td className="p-4 text-sm text-emerald-600">{student.course}</td>
                  <td className="p-4 text-right">
                    <button className="bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-900/30 px-3 py-1 text-xs font-bold uppercase transition-colors flex items-center gap-2 ml-auto">
                      <Mail className="w-3.5 h-3.5" /> Contact
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
