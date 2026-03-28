import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Search, CheckSquare, XSquare, MoreVertical, Shield, X, Bell, Download, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function StudentManagement() {
  const { token } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const studentsRes = await fetch("http://localhost:5000/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const studentsData = await studentsRes.json();
      if (studentsData.success) setStudents(studentsData.data);

      try {
        const requestsRes = await fetch("http://localhost:5000/api/enrollments/requests/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requestsData = await requestsRes.json();
        if (requestsData.success) setRequests(requestsData.data);
      } catch {
        // pending requests endpoint may not exist yet
      }
    } catch (err) {
      console.error("Failed to load student data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleResolveRequest = async (requestId: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`http://localhost:5000/api/enrollments/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
      alert("Error updating request");
    }
  };

  const handleChangeRole = async (userId: string, currentRole: string) => {
    const newRole = prompt(`Current role: ${currentRole}. Enter new role (student, teacher, admin):`, currentRole);
    if (!newRole || !["student", "teacher", "admin"].includes(newRole.toLowerCase())) {
      if (newRole) alert("Invalid role.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole.toLowerCase() }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Role updated!");
        fetchData();
      } else {
        alert(data.error || "Failed");
      }
    } catch {
      alert("Error");
    }
  };

  const openAccessModal = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
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
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name or Email..."
              className="bg-transparent border-none outline-none text-sm text-slate-900 w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs tracking-wider bg-slate-50">
                  <th className="p-4 font-semibold rounded-tl-lg">ID</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold text-right rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students
                  .filter((s) => {
                    const q = searchQuery.toLowerCase();
                    return (
                      s.name?.toLowerCase().includes(q) ||
                      s.id.toLowerCase().includes(q) ||
                      (s.email && s.email.toLowerCase().includes(q))
                    );
                  })
                  .map((student, i) => {
                    const stdRequests = requests.filter((r) => r.student_id === student.id);
                    const hasRequests = stdRequests.length > 0;

                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="p-4 text-sm text-slate-500 font-medium">{student.id.slice(0, 8)}...</td>
                        <td className="p-4 text-sm text-slate-900 font-medium">
                          <div className="flex items-center gap-2">
                            {student.name}
                            {hasRequests && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold animate-pulse">
                                <Bell className="w-3 h-3" /> Requests ({stdRequests.length})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-slate-700">{student.email}</div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                              student.role === "admin"
                                ? "bg-purple-100 text-purple-700"
                                : student.role === "teacher"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {student.role.charAt(0).toUpperCase() + student.role.slice(1)}
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
                            <button
                              onClick={() => handleChangeRole(student.id, student.role)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                              title="Change Role"
                            >
                              <Shield className="w-3.5 h-3.5" /> Role
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Access Management Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" /> Manage Access
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Student: <span className="font-medium text-slate-700">{selectedStudent.name}</span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm font-medium text-slate-700 mb-2 border-b pb-2">Pending Enrollment Requests:</p>

              {requests.filter((r) => r.student_id === selectedStudent.id).length === 0 ? (
                <div className="text-sm text-slate-500 italic pb-4">No pending requests.</div>
              ) : (
                requests
                  .filter((r) => r.student_id === selectedStudent.id)
                  .map((req) => (
                    <div
                      key={req.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-amber-200 bg-amber-50 gap-3"
                    >
                      <div className="text-sm font-medium text-slate-800">Course: {req.course_id.slice(0, 8)}...</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolveRequest(req.id, "approved")}
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <CheckSquare className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => handleResolveRequest(req.id, "rejected")}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <XSquare className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
