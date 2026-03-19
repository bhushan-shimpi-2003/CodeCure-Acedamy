import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Youtube, FileText, Lock, MessageSquare, Send } from "lucide-react";

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
      <div className="max-w-5xl mx-auto space-y-6 pb-12 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-emerald-500/30 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
              <Terminal className="w-6 h-6 text-emerald-500" /> Course_Content
            </h1>
            <p className="text-emerald-600 text-sm uppercase">&gt; Access the latest lecture and materials.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-red-500/50 p-12 text-center rounded-none shadow-[0_0_30px_rgba(239,68,68,0.1)]"
        >
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-red-500 uppercase mb-4 tracking-widest">Access_Denied</h2>
          <p className="text-red-400/80 text-sm uppercase max-w-md mx-auto leading-relaxed">
            You do not have access to any course videos. Please request enrollment from the Overview page.
          </p>
          <div className="mt-8 inline-block border border-red-500/30 bg-red-500/10 px-6 py-3 text-red-400 text-xs font-bold uppercase">
            ERR_CODE: 403_FORBIDDEN
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-mono">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-emerald-500/30 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Course_Content
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Access the latest lecture and materials.</p>
        </div>
      </div>

      {featuredVideoId ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="p-4 md:p-6 border-b border-emerald-500/20 bg-[#050505] flex items-center gap-3">
                <Youtube className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-white uppercase">{videoTitle || "Latest Lecture"}</h2>
                <span className="ml-auto px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/30 uppercase animate-pulse">
                  LIVE_NOW
                </span>
              </div>
              
              <div className="aspect-video w-full bg-black">
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
                <div className="p-6 bg-[#0a0a0a] border-t border-emerald-500/30">
                  <h3 className="text-sm font-bold text-emerald-500 uppercase flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4" /> Lecture_Notes
                  </h3>
                  <div className="bg-[#050505] border border-emerald-900/50 p-6 rounded-none">
                    <p className="text-emerald-400 whitespace-pre-wrap font-mono leading-relaxed text-sm">
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
              className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none h-full flex flex-col"
            >
              <div className="p-4 border-b border-emerald-500/30 bg-[#050505] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-bold text-white uppercase">Lecture_Doubts</h3>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[500px] space-y-4">
                {doubts.length === 0 ? (
                  <div className="text-center text-emerald-700 text-xs uppercase py-8">
                    No doubts asked yet.
                  </div>
                ) : (
                  doubts.map(doubt => (
                    <div key={doubt.id} className="bg-[#050505] border border-emerald-900/50 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-emerald-600">{doubt.time}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 uppercase border ${
                          doubt.status === 'resolved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {doubt.status}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-300">{doubt.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-emerald-500/30 bg-[#050505]">
                <form onSubmit={handleAskDoubt} className="flex gap-2">
                  <input 
                    type="text" 
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    placeholder="Ask a doubt..." 
                    className="flex-1 bg-[#111] border border-emerald-500/30 px-3 py-2 text-xs text-emerald-400 focus:outline-none focus:border-emerald-500 placeholder:text-emerald-800"
                  />
                  <button 
                    type="submit"
                    disabled={!doubtText.trim()}
                    className="bg-emerald-500 text-black p-2 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          className="bg-[#0a0a0a] border border-emerald-500/30 p-12 text-center"
        >
          <Terminal className="w-12 h-12 text-emerald-900 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-emerald-600 uppercase mb-2">Awaiting_Transmission</h2>
          <p className="text-emerald-800 text-sm uppercase">The instructor has not published any content yet.</p>
        </motion.div>
      )}
    </div>
  );
}
