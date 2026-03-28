import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Link as LinkIcon, Youtube, Type, FileText, LayoutDashboard } from "lucide-react";

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
        
        <div className="space-y-6">
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
              disabled={isSharing || !youtubeLink.trim() || !videoTitle.trim()}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                isSharing || !youtubeLink.trim() || !videoTitle.trim()
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              {isSharing ? 'Publishing...' : 'Publish Content'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
