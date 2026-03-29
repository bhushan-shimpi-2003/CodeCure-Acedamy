import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Link as LinkIcon, Type, FileText, LayoutDashboard, Loader2, BookOpen, Video, Film } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherPublishLecture() {
  const { token } = useAuth();
  const [videoUrl, setVideoUrl] = useState("");
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

  const handlePublishVideo = async () => {
    if (!videoUrl.trim() || !videoTitle.trim() || !selectedCourseId) return;
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
          video_url: videoUrl,
          content: videoNotes
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShareSuccess(true);
        setVideoUrl("");
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
            <Video className="w-6 h-6 text-blue-600" /> Publish Lecture
          </h1>
          <p className="text-slate-500 text-sm">Add a new video lecture to your courses.</p>
        </div>
        <div className="flex items-center gap-4">
          {shareSuccess && (
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <CheckCircle className="w-4 h-4" /> Content Published
            </span>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-blue-600" /> Upload Details
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Course Selector */}
          <div>
            {isLoadingCourses ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <p className="text-sm text-slate-500">No courses assigned. Contact admin to create a course first.</p>
            ) : (
              <Select
                label="Select Course"
                required
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
              className="w-full bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all duration-200"
            />
          </div>

          {/* Video Link Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-slate-400" /> Video Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Source video link or <iframe> embed code..."
              className="w-full bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all duration-200"
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
              className="w-full bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all duration-200 resize-none"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 pr-5">This content will be immediately visible to all enrolled students.</p>
            <button
              onClick={handlePublishVideo}
              disabled={isSharing || !videoUrl.trim() || !videoTitle.trim() || !selectedCourseId}
              className={`w-full sm:w-auto shrink-0 px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                isSharing || !videoUrl.trim() || !videoTitle.trim() || !selectedCourseId
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
