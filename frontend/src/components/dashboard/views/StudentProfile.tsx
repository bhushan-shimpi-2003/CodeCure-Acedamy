import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, Shield, Save, Loader2, CheckCircle, Lock, Camera } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

import { API_URL, API_BASE_URL } from '../../../config';
const API = API_URL;

export default function StudentProfile() {
  const { user, token, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setIsSaving(true);
    try {
      const res = await fetch(`${API}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email, phone, ...(password && { password }) }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        updateUser(data.data);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch {
      setError("Server error");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (n: string) => n.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" /> My Profile
        </h1>
        <p className="text-slate-500 text-sm">Update your personal information.</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header Banner - Simple Gradient */}
        <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 flex items-center px-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-2xl font-bold border border-white/30">
                {getInitials(user?.name || "CC")}
            </div>
            <div className="ml-6 text-white">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-blue-100 text-sm uppercase tracking-wider font-bold">{user?.role}</p>
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {saved && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Profile updated successfully!
            </motion.div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold">{error}</div>
          )}

          <div>
            <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Full Name
            </label>
            <input
              type="text" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" /> New Password
            </label>
            <input
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> Phone Number
            </label>
            <input
              type="tel"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 1234567890"
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex text-sm font-semibold text-slate-700 mb-2 items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" /> Role
            </label>
            <input
              type="text" disabled
              value={(user?.role || "student").charAt(0).toUpperCase() + (user?.role || "student").slice(1)}
              className="w-full bg-slate-100 border border-slate-200 p-3 rounded-xl text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">Contact admin to change your role.</p>
          </div>

          <button
            type="submit" disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
