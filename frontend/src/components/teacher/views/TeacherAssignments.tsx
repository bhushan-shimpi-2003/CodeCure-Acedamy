import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileCode2, Send, Calendar, FileText, GraduationCap, Loader2, BookOpen, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
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

  // For assignments view
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, any[]>>({});
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedCourseId) {
      fetchAssignments(selectedCourseId);
    } else {
      setAssignments([]);
    }
  }, [selectedCourseId]);

  const fetchAssignments = async (courseId: string) => {
    try {
      const res = await fetch(`${API}/assignments/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAssignments(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpand = async (assignmentId: string) => {
    if (expandedAssignment === assignmentId) {
      setExpandedAssignment(null);
      return;
    }
    setExpandedAssignment(assignmentId);
    
    if (!submissions[assignmentId]) {
      try {
        const res = await fetch(`${API}/assignments/${assignmentId}/submissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setSubmissions(prev => ({ ...prev, [assignmentId]: data.data }));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGrade = async (submissionId: string) => {
    const scoreStr = prompt("Enter grade (e.g., 8/10):");
    if (!scoreStr) return;
    const score = parseInt(scoreStr, 10);
    if (isNaN(score)) return;
    const feedback = prompt("Enter feedback (optional):") || "";
    
    try {
      const res = await fetch(`${API}/assignments/submissions/${submissionId}/grade`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ score, feedback })
      });
      const data = await res.json();
      if (data.success) {
         setSubmissions(prev => {
           const updated = { ...prev };
           for (const [aId, subs] of Object.entries(updated)) {
             updated[aId] = (subs as any[]).map((s: any) => s.id === submissionId ? { ...s, status: 'graded', score, feedback } : s);
           }
           return updated;
         });
      } else {
         alert("Failed to grade.");
      }
    } catch (err) {
      alert("Error grading submission.");
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
        fetchAssignments(selectedCourseId);
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

      {/* Assignment Submissions */}
      {selectedCourseId && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Existing Assignments & Submissions
          </h2>

          {assignments.length === 0 ? (
            <p className="text-sm text-slate-500 italic text-center py-6">No assignments found for this course.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map(a => (
                <div key={a.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors">
                  <div 
                    onClick={() => handleExpand(a.id)}
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{a.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Due: {new Date(a.due_date).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      {expandedAssignment === a.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </div>

                  {expandedAssignment === a.id && (
                    <div className="p-4 bg-white border-t border-slate-100">
                      {!submissions[a.id] ? (
                        <div className="flex justify-center p-4">
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        </div>
                      ) : submissions[a.id].length === 0 ? (
                        <p className="text-xs text-slate-500 italic text-center py-2">No student has submitted this assignment yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {submissions[a.id].map(sub => (
                            <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">{sub.profiles?.name || sub.profiles?.email || 'Unknown Student'}</p>
                                <a href={sub.submission_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-700 mt-1 flex items-center gap-1 font-medium">
                                  <LinkIcon className="w-3 h-3" /> View Work
                                </a>
                              </div>
                              <div className="mt-3 sm:mt-0 flex flex-col sm:items-end gap-2">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${
                                  sub.status === 'graded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                  {sub.status} {sub.score && `· ${sub.score}/10`}
                                </span>
                                {sub.status !== 'graded' && (
                                  <button
                                    onClick={() => handleGrade(sub.id)}
                                    className="px-3 py-1 bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-xs font-semibold rounded-lg transition-colors"
                                  >
                                    Grade Now
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
