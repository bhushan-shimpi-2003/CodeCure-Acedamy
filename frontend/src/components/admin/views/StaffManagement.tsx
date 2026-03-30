import { API_URL, API_BASE_URL } from '../../../config';
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { UserCog, Plus, Loader2, Shield, X, Mail, Lock, User } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/AuthContext";

const API = API_URL;

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

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`${API}/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
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
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-4 sm:pt-8 w-full border-none">
      <div className="border-b border-slate-200 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <UserCog className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> Staff Management
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">&gt; Manage instructors, admins, and roles.</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setFormError(""); setFormSuccess(""); }}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 sm:py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-[0_8px_30px_rgb(37,99,235,0.2)] flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" /> Create Staff Account
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : staff.length === 0 ? (
        <div className="text-center p-12 bg-white/50 backdrop-blur-xl rounded-2xl border border-slate-200/60 text-slate-500 shadow-sm">
          No staff members found. Click "Create Staff Account" to add teachers or admins.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member, i) => {
            const isAdmin = member.role === "admin";
            const initials = String(member.name || member.email || "U").substring(0, 2).toUpperCase();
            
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative group bg-white/90 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:z-[60] focus-within:z-[60] ${
                  isAdmin ? 'hover:border-purple-300 hover:shadow-purple-500/10 border-slate-200/60' : 'hover:border-blue-300 hover:shadow-blue-500/10 border-slate-200/60'
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className={`absolute top-0 right-0 w-40 h-40 -mr-12 -mt-12 rounded-full blur-[40px] opacity-20 transition-all duration-500 group-hover:opacity-50 group-hover:scale-110 ${
                    isAdmin ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                
                <div className="flex justify-between items-start mb-6 relative z-10 w-full">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border transition-colors ${
                      isAdmin ? 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border-purple-200' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      {initials}
                    </div>
                    <div className="min-w-0 pr-2">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-current transition-colors truncate">{member.name || "Unnamed Profile"}</h3>
                      <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-0.5 truncate"><Mail className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{member.email}</span></p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex-1 space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Current Role</span>
                    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-lg border shadow-[0_2px_10px_rgb(0,0,0,0.02)] ${
                      isAdmin ? "bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 border-purple-200/60" : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200/60"
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">User ID</span>
                    <span className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100 font-medium">{member.id.substring(0, 8)}</span>
                  </div>
                </div>

                <div className="relative z-10 pt-5 border-t border-slate-100 mt-auto">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 block flex items-center gap-1.5">
                    <UserCog className="w-3.5 h-3.5" /> Identity Assignment
                  </label>
                  <div className="relative flex items-center group/select w-full group-focus-within:z-[70]">
                    <Select
                      size="sm"
                      value={member.role}
                      onChange={(e) => handleChangeRole(member.id, e.target.value)}
                      className={`w-full !pl-10 !py-2.5 shadow-sm transition-all focus:ring-2 !font-bold ${
                        isAdmin 
                          ? '!bg-purple-50 border-purple-200 !text-purple-700 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500/20' 
                          : '!bg-blue-50 border-blue-200 !text-blue-700 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </Select>
                    <Shield className={`w-4 h-4 absolute left-3.5 pointer-events-none z-10 transition-colors ${
                      isAdmin ? 'text-purple-600 group-hover/select:text-purple-700' : 'text-blue-600 group-hover/select:text-blue-700'
                    }`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Staff Modal */}
      {showModal && createPortal(
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
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
                <Select
                  value={newRole} onChange={(e) => setNewRole(e.target.value)}
                  icon={<Shield className="w-4 h-4 text-slate-400" />}
                >
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </Select>
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
        </div>,
        document.body
      )}
    </div>
  );
}
