import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { UserCog, Plus, Loader2, Shield, X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function StaffManagement() {
  const { token } = useAuth();
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Create staff form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("teacher");

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/admin/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStaff(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStaff();
  }, [token]);

  const handleChangeRole = async (userId: string, currentRole: string) => {
    const newR = prompt(`Current role: ${currentRole}. Enter new role (student, teacher, admin):`, currentRole);
    if (!newR || !["student", "teacher", "admin"].includes(newR.toLowerCase())) {
      if (newR) alert("Invalid role. Use student, teacher, or admin.");
      return;
    }
    try {
      const res = await fetch(`${API}/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newR.toLowerCase() }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Role updated!");
        fetchStaff();
      } else {
        alert(data.error || "Failed to update role");
      }
    } catch {
      alert("Error updating role");
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsCreating(true);
    try {
      const res = await fetch(`${API}/admin/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName, email: newEmail, password: newPassword, role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess(`${newRole.charAt(0).toUpperCase() + newRole.slice(1)} "${newName}" created successfully!`);
        setNewName(""); setNewEmail(""); setNewPassword(""); setNewRole("teacher");
        fetchStaff();
        setTimeout(() => { setShowModal(false); setFormSuccess(""); }, 2000);
      } else {
        setFormError(data.error || "Failed to create staff");
      }
    } catch {
      setFormError("Server error. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-blue-600" /> Staff Management
          </h1>
          <p className="text-slate-500 text-sm">&gt; Manage instructors, admins, and roles.</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setFormError(""); setFormSuccess(""); }}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Staff Account
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : staff.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          No staff members found. Click "Create Staff Account" to add teachers or admins.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl p-6 relative group hover:border-blue-400 transition-colors flex flex-col"
            >
              <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${member.role === "admin" ? "bg-purple-100 group-hover:bg-purple-600" : "bg-blue-100 group-hover:bg-blue-600"}`}></div>
              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{member.name || "Unnamed"}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{member.email}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold border ${member.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                  {member.role.toUpperCase()}
                </span>
              </div>

              <div className="pl-2 mb-6 flex-1 text-sm text-slate-600">
                User ID: <span className="font-mono text-xs">{member.id.substring(0, 8)}...</span>
              </div>

              <div className="flex items-center gap-2 pl-2 border-t border-slate-100 pt-4 mt-auto">
                <button
                  onClick={() => handleChangeRole(member.id, member.role)}
                  className="flex-1 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1.5 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5" /> Change Role
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Create Staff Account
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSuccess && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl border border-green-200">{formSuccess}</div>
            )}
            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm font-semibold rounded-xl border border-red-200">{formError}</div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Full Name
                </label>
                <input
                  type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Rahul Shetty"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Email Address
                </label>
                <input
                  type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g., teacher@codecure.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Password
                </label>
                <input
                  type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  minLength={6}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-400" /> Role
                </label>
                <select
                  value={newRole} onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all appearance-none"
                >
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit" disabled={isCreating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isCreating ? "Creating..." : "Create Account"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
