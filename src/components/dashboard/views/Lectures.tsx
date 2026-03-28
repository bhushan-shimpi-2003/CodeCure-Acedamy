import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PlayCircle, Youtube, FileText, Lock, MessageSquare, Send, BookOpen } from "lucide-react";

export default function Lectures() {
  const [featuredVideoId, setFeaturedVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [videoNotes, setVideoNotes] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [doubtText, setDoubtText] = useState("");
  const [doubts, setDoubts] = useState<{ id: string; text: string; time: string; status: string }[]>([]);

  // We use STD_001 as the mock logged-in student for demonstration
  const CURRENT_STUDENT_ID = "STD_001";

  useEffect(() => {
    // Check access
    const savedCourses = localStorage.getItem(`assigned_courses_${CURRENT_STUDENT_ID}`);
    if (savedCourses) {
      const courses = JSON.parse(savedCourses);
      // If the student has at least one course assigned, we grant access to the videos
      if (courses.length > 0) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } else {
      // Default state if admin hasn't configured anything yet
      setHasAccess(false); 
    }

    const savedLink = localStorage.getItem("sharedYoutubeLink");
    const savedTitle = localStorage.getItem("sharedVideoTitle");
    const savedNotes = localStorage.getItem("sharedVideoNotes");

    if (savedTitle) setVideoTitle(savedTitle);
    if (savedNotes) setVideoNotes(savedNotes);

    if (savedLink) {
      // Extract YouTube ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = savedLink.match(regExp);
      if (match && match[2].length === 11) {
        setFeaturedVideoId(match[2]);
      }
    }

    // Load mock doubts
    const savedDoubts = localStorage.getItem(`lecture_doubts_${CURRENT_STUDENT_ID}`);
    if (savedDoubts) {
      setDoubts(JSON.parse(savedDoubts));
    }
  }, []);

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    const newDoubt = {
      id: Date.now().toString(),
      text: doubtText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };

    const updatedDoubts = [newDoubt, ...doubts];
    setDoubts(updatedDoubts);
    localStorage.setItem(`lecture_doubts_${CURRENT_STUDENT_ID}`, JSON.stringify(updatedDoubts));
    setDoubtText("");
  };

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

      {featuredVideoId ? (
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
                <h2 className="text-xl font-bold text-slate-900">{videoTitle || "Latest Lecture"}</h2>
                <span className="ml-auto px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                  LIVE NOW
                </span>
              </div>
              
              <div className="aspect-video w-full bg-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${featuredVideoId}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>

              {videoNotes && (
                <div className="p-6 bg-white border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-blue-600" /> Lecture Notes
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                      {videoNotes}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
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
                        <span className="text-xs text-slate-500 font-medium">{doubt.time}</span>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                          doubt.status === 'resolved' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {doubt.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{doubt.text}</p>
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
          <p className="text-slate-500 text-sm">The instructor has not published any content yet.</p>
        </motion.div>
      )}
    </div>
  );
}
