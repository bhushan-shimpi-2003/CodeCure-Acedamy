import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, Shield, Save, Loader2, CheckCircle, Lock, Camera } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminProfile() {
  const { user, token, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      if (user.profile_picture && user.profile_picture !== 'no-photo.jpg') {
        setProfilePic(user.profile_picture);
      }
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API}/upload/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProfilePic(data.url);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch {
      setError("Server error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setIsSaving(true);
    try {
      const res = await fetch(`${API}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email, phone, profile_picture: profilePic, ...(password && { password }) }),
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
        {/* Header Banner */}
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative">
          <div className="absolute -bottom-10 left-6">
            <label className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center relative group overflow-hidden cursor-pointer cursor-allowed disabled:cursor-not-allowed">
              {profilePic ? (
                <img src={profilePic.startsWith("http") ? profilePic : `http://localhost:5000${profilePic}`} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <User className="w-10 h-10 text-blue-600" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {isUploading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
            </label>
          </div>
        </div>

        <div className="pt-14 px-6 pb-2">
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold text-slate-900">{user?.name || "User"}</p>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
              user?.role === "admin"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : user?.role === "teacher"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}>
              {(user?.role || "student").toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
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
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Full Name
            </label>
            <input
              type="text" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3 rounded-xl text-slate-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
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
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
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
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
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
