import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Link as LinkIcon, Youtube, Type, FileText, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherOverview() {
  const { token } = useAuth();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoNotes, setVideoNotes] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyCourses();
  }, [token]);

  const fetchMyCourses = async () => {
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

  const handleShareYoutube = async () => {
    if (!youtubeLink.trim() || !videoTitle.trim() || !selectedCourseId) return;
    setIsSharing(true);
    setError("");

    try {
      const res = await fetch(`${API}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: selectedCourseId,
          title: videoTitle,
          video_url: youtubeLink,
          content: videoNotes
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShareSuccess(true);
        setYoutubeLink("");
        setVideoTitle("");
        setVideoNotes("");
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to publish content");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" /> Course Management
          </h1>
          <p className="text-slate-500 text-sm">Publish new course content to enrolled students.</p>
        </div>
        <div className="flex items-center gap-4">
          {shareSuccess && (
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <CheckCircle className="w-4 h-4" /> Content Published
            </span>
          )}
        </div>
      </div>

      {/* YouTube Link Sharing Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-600" /> Publish New Lecture
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6">
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
              <p className="text-sm text-slate-500">No courses assigned. Contact admin to create a course first.</p>
            ) : (
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="block w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl transition-colors"
              >
                {courses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" /> Lecture Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g., Advanced Playwright Locators"
              className="block w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl transition-colors"
            />
          </div>

          {/* YouTube Link Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-slate-400" /> YouTube URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="e.g., https://youtube.com/watch?v=..."
              className="block w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl transition-colors"
            />
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Lecture Notes <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={videoNotes}
              onChange={(e) => setVideoNotes(e.target.value)}
              placeholder="Add key takeaways, commands, or documentation links here..."
              rows={6}
              className="block w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl resize-none transition-colors"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">This content will be immediately visible to all enrolled students.</p>
            <button
              onClick={handleShareYoutube}
              disabled={isSharing || !youtubeLink.trim() || !videoTitle.trim() || !selectedCourseId}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                isSharing || !youtubeLink.trim() || !videoTitle.trim() || !selectedCourseId
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isSharing ? 'Publishing...' : 'Publish Content'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
