import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, CheckCircle, Link as LinkIcon, Youtube, Type, FileText } from "lucide-react";

export default function TeacherOverview() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoNotes, setVideoNotes] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    const savedLink = localStorage.getItem("sharedYoutubeLink");
    const savedTitle = localStorage.getItem("sharedVideoTitle");
    const savedNotes = localStorage.getItem("sharedVideoNotes");
    
    if (savedLink) setYoutubeLink(savedLink);
    if (savedTitle) setVideoTitle(savedTitle);
    if (savedNotes) setVideoNotes(savedNotes);
  }, []);

  const handleShareYoutube = () => {
    if (!youtubeLink.trim() || !videoTitle.trim()) return;
    setIsSharing(true);
    
    setTimeout(() => {
      localStorage.setItem("sharedYoutubeLink", youtubeLink);
      localStorage.setItem("sharedVideoTitle", videoTitle);
      localStorage.setItem("sharedVideoNotes", videoNotes);
      setIsSharing(false);
      setShareSuccess(true);
      
      setTimeout(() => {
        setShareSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-500" /> Course_Management
          </h1>
          <p className="text-emerald-600 text-sm uppercase">&gt; Publish new course content to enrolled students.</p>
        </div>
        <div className="flex items-center gap-4">
          {shareSuccess && (
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 animate-pulse">
              <CheckCircle className="w-4 h-4" /> CONTENT_PUBLISHED
            </span>
          )}
        </div>
      </div>

      {/* YouTube Link Sharing Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 md:p-8"
      >
        <h2 className="text-lg font-bold text-emerald-500 uppercase border-b border-emerald-500/20 pb-3 mb-6 flex items-center gap-2">
          <Youtube className="w-5 h-5" /> Publish_New_Lecture
        </h2>
        
        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-emerald-600 uppercase mb-2 flex items-center gap-2">
              <Type className="w-3 h-3" /> Lecture_Title *
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g., Advanced Playwright Locators"
              className="block w-full px-4 py-3 border border-emerald-500/30 bg-[#050505] text-emerald-400 placeholder-emerald-800/50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-none"
            />
          </div>

          {/* YouTube Link Input */}
          <div>
            <label className="block text-xs font-bold text-emerald-600 uppercase mb-2 flex items-center gap-2">
              <LinkIcon className="w-3 h-3" /> YouTube_URL *
            </label>
            <input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="e.g., https://youtube.com/watch?v=..."
              className="block w-full px-4 py-3 border border-emerald-500/30 bg-[#050505] text-emerald-400 placeholder-emerald-800/50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-none"
            />
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-xs font-bold text-emerald-600 uppercase mb-2 flex items-center gap-2">
              <FileText className="w-3 h-3" /> Lecture_Notes (Optional)
            </label>
            <textarea
              value={videoNotes}
              onChange={(e) => setVideoNotes(e.target.value)}
              placeholder="Add key takeaways, commands, or documentation links here..."
              rows={6}
              className="block w-full px-4 py-3 border border-emerald-500/30 bg-[#050505] text-emerald-400 placeholder-emerald-800/50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
            <p className="text-xs text-emerald-600">&gt; This content will be immediately visible to all enrolled students.</p>
            <button
              onClick={handleShareYoutube}
              disabled={isSharing || !youtubeLink.trim() || !videoTitle.trim()}
              className={`px-8 py-3 rounded-none font-bold uppercase transition-colors flex items-center justify-center gap-2 ${
                isSharing || !youtubeLink.trim() || !videoTitle.trim()
                  ? 'bg-emerald-900/50 border border-emerald-500/50 text-emerald-600 cursor-not-allowed'
                  : 'bg-emerald-500 border border-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              }`}
            >
              {isSharing ? 'PUBLISHING...' : 'PUBLISH_CONTENT'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
