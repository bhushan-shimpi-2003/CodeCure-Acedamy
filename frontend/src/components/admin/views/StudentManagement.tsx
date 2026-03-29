import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Users, Search, CheckSquare, XSquare, MoreVertical, Shield, X, Bell, Download, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function StudentManagement() {
  const { token } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
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
      } catch (err) { console.error(err); }

      try {
        const enrollmentsRes = await fetch("http://localhost:5000/api/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const enrollmentsData = await enrollmentsRes.json();
        if (enrollmentsData.success) setEnrollments(enrollmentsData.data || []);
      } catch (err) { console.error(err); }
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

  const handleRemoveAccess = async (enrollmentId: string) => {
    if (!confirm("Are you sure you want to remove access to this course?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/enrollments/${enrollmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ student_status: "cancelled" }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
      alert("Error removing access");
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
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4 sm:pt-8 w-full overflow-x-hidden">
      <div className="border-b border-slate-200 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> Student Management
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Manage enrollments, progress, and access.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
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
      {isModalOpen && selectedStudent && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white/95 backdrop-blur-2xl rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200/60"
          >
            {/* Modal Header */}
            <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-100 flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="bg-blue-100 p-2.5 rounded-xl shadow-inner border border-blue-200/50">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Manage Access
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Modifying enrollment for <span className="font-semibold text-slate-800">{selectedStudent.name}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-200 border border-slate-200 hover:border-slate-300 p-1.5 rounded-lg transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Pending Requests Section */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5" /> Pending Requests
                </h4>

                {requests.filter((r) => r.student_id === selectedStudent.id).length === 0 ? (
                  <div className="text-sm text-slate-400 italic bg-slate-50 rounded-xl p-4 border border-slate-100/50 text-center">
                    No pending enrollment requests.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requests
                      .filter((r) => r.student_id === selectedStudent.id)
                      .map((req) => (
                        <div
                          key={req.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-amber-200 bg-amber-50/50 shadow-sm"
                        >
                          <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            {req.courses?.title || req.course_id.slice(0, 8) + '...'}
                          </div>
                          <div className="flex gap-2 mt-3 sm:mt-0">
                            <button
                              onClick={() => handleResolveRequest(req.id, "approved")}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                            >
                              <CheckSquare className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => handleResolveRequest(req.id, "rejected")}
                              className="bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-200 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                            >
                              <XSquare className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Active Courses Section */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5" /> Active Courses
                </h4>

                {enrollments.filter((e) => e.student_id === selectedStudent.id && e.student_status === 'active').length === 0 ? (
                  <div className="text-sm text-slate-400 italic bg-slate-50 rounded-xl p-4 border border-slate-100/50 text-center">
                    Student has no active courses.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {enrollments
                      .filter((e) => e.student_id === selectedStudent.id && e.student_status === 'active')
                      .map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 shadow-sm transition-all group"
                        >
                          <div className="text-sm font-semibold text-slate-800 flex items-center gap-3">
                            <div className="bg-emerald-100 p-1.5 rounded-md">
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            </div>
                            {enrollment.courses?.title || enrollment.course_id.slice(0, 8) + '...'}
                          </div>
                          <button
                            onClick={() => handleRemoveAccess(enrollment.id)}
                            className="mt-3 sm:mt-0 px-3.5 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                            <XSquare className="w-4 h-4" /> Revoke
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
