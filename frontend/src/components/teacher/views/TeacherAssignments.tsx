import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileCode2, Send, Calendar, FileText, GraduationCap, Loader2, BookOpen } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherAssignments() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    try {
      setIsLoadingCourses(true);
      const res = await fetch(`${API}/courses/teacher/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        if (data.data.length > 0) setSelectedCourseId(data.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: selectedCourseId,
          title,
          description,
          due_date: dueDate || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Assignment "${title}" created successfully!`);
        setTitle("");
        setDescription("");
        setDueDate("");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setError(data.error || "Failed to create assignment");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" /> Assignment Panel
        </h1>
        <p className="text-slate-500 text-sm">Create and distribute new assignments.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
        
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-blue-600" /> Create New Assignment
        </h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-5">
            {/* Course Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Course <span className="text-red-500">*</span>
              </label>
              {isLoadingCourses ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading courses...
                </div>
              ) : courses.length === 0 ? (
                <p className="text-sm text-slate-500">No courses assigned.</p>
              ) : (
                <Select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  icon={<BookOpen className="w-4 h-4 text-slate-400" />}
                >
                  {courses.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </Select>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" /> Assignment Title
              </label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all"
                placeholder="e.g., JS Array Methods Practice"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" /> Description
              </label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all resize-none"
                placeholder="Provide detailed instructions for the assignment..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Due Date
              </label>
              <input 
                type="datetime-local" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !selectedCourseId}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Distribute Assignment
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
