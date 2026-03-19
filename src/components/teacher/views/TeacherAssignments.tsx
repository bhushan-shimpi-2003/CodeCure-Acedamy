import React, { useState } from "react";
import { motion } from "motion/react";
import { FileCode2, Terminal, Send, Calendar, FileText } from "lucide-react";

export default function TeacherAssignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Assignment "${title}" created successfully!`);
      setTitle("");
      setDescription("");
      setDueDate("");
      
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Assignment_Panel
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Create and distribute new assignments.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 md:p-8 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        
        <h2 className="text-lg font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
          <FileCode2 className="w-5 h-5" /> Create_New_Assignment
        </h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm font-bold uppercase">
            &gt; {successMessage}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Assignment_Title
              </label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors"
                placeholder="e.g., JS Array Methods Practice"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Description
              </label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors resize-none"
                placeholder="Provide detailed instructions for the assignment..."
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Due_Date
              </label>
              <input 
                type="datetime-local" 
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-4 rounded-none font-bold uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5 fill-current" /> Distribute_Assignment
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
