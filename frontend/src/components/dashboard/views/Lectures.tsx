import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PlayCircle, Youtube, FileText, Lock, MessageSquare, Send, BookOpen, Loader2 } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function Lectures() {
  const { user, token } = useAuth();
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [doubtText, setDoubtText] = useState("");
  const [doubts, setDoubts] = useState<any[]>([]);

  // Step 1: Fetch enrolled courses
  useEffect(() => {
    const checkAccess = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const enrollRes = await fetch(`${API}/enrollments/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        if (enrollData.success) {
          const active = enrollData.data.filter((e: any) => e.student_status === 'active');
          if (active.length > 0) {
            setHasAccess(true);
            const courses = active.map((e: any) => ({
              id: e.course_id,
              title: e.courses?.title || 'Unknown Course'
            }));
            setEnrolledCourses(courses);
            setSelectedCourseId(courses[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to check access:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [token]);

  // Step 2: When a course is selected, fetch its lessons
  useEffect(() => {
    const fetchLessons = async () => {
      if (!selectedCourseId || !token) return;
      try {
        const res = await fetch(`${API}/lessons/course/${selectedCourseId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setLessons(data.data);
          setSelectedLesson(data.data[data.data.length - 1]); // latest lesson
        } else {
          setLessons([]);
          setSelectedLesson(null);
        }
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        setLessons([]);
        setSelectedLesson(null);
      }
    };

    fetchLessons();
  }, [selectedCourseId, token]);

  // Fetch doubts from API
  useEffect(() => {
    const fetchDoubts = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API}/doubts/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setDoubts(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch doubts:", err);
      }
    };
    fetchDoubts();
  }, [token]);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim() || !token) return;

    try {
      const res = await fetch(`${API}/doubts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: doubtText, course_id: selectedCourseId })
      });
      const data = await res.json();
      if (data.success) {
        setDoubts([data.data, ...doubts]);
        setDoubtText("");
      }
    } catch (err) {
      console.error("Failed to submit doubt:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-blue-600" /> Course Content
            </h1>
            <p className="text-slate-500 text-sm">Access the latest lecture and materials.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-red-100 p-12 text-center rounded-2xl shadow-sm"
        >
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            You do not have access to any course videos. Please request enrollment from the Overview page.
          </p>
        </motion.div>
      </div>
    );
  }

  const videoId = selectedLesson ? extractVideoId(selectedLesson.youtube_url) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-blue-600" /> Course Content
          </h1>
          <p className="text-slate-500 text-sm">Access the latest lecture and materials.</p>
        </div>

        {/* Course Selector */}
        {enrolledCourses.length > 1 && (
            <Select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              icon={<BookOpen className="w-4 h-4 text-slate-400" />}
            >
              {enrolledCourses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </Select>
        )}
      </div>

      {videoId ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <Youtube className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedLesson?.title || "Latest Lecture"}</h2>
                {selectedLesson?.is_live && (
                  <span className="ml-auto px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                    LIVE NOW
                  </span>
                )}
              </div>
              
              <div className="aspect-video w-full bg-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>

              {selectedLesson?.notes && (
                <div className="p-6 bg-white border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-blue-600" /> Lecture Notes
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedLesson.notes}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Lesson List */}
            {lessons.length > 1 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 px-2">All Lessons ({lessons.length})</h3>
                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {lessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${
                        selectedLesson?.id === lesson.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-700 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        selectedLesson?.id === lesson.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                      {lesson.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Doubt Support Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-200 rounded-2xl h-full flex flex-col shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Lecture Doubts</h3>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[500px] space-y-4 bg-white">
                {doubts.length === 0 ? (
                  <div className="text-center text-slate-500 text-sm py-8 flex flex-col items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                    No doubts asked yet.
                  </div>
                ) : (
                  doubts.map(doubt => (
                    <div key={doubt.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {new Date(doubt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                          doubt.status === 'resolved' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {doubt.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{doubt.text}</p>
                      {doubt.reply && (
                        <div className="mt-3 pt-3 border-t border-slate-200 bg-white rounded-lg p-3 text-xs">
                          <span className="font-bold text-blue-600 block mb-1">Reply:</span>
                          <p className="text-slate-600">{doubt.reply}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-white">
                <form onSubmit={handleAskDoubt} className="flex gap-2">
                  <input 
                    type="text" 
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    placeholder="Ask a doubt..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!doubtText.trim()}
                    className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm"
        >
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Awaiting Content</h2>
          <p className="text-slate-500 text-sm">
            {enrolledCourses.length > 0 
              ? `No lessons published yet for "${enrolledCourses.find(c => c.id === selectedCourseId)?.title || 'this course'}".`
              : "The instructor has not published any content yet."
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}
