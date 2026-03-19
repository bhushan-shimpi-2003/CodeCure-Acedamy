import React, { useState } from "react";
import { motion } from "motion/react";
import { Video, Calendar, Terminal, Send, User } from "lucide-react";

export default function TeacherInterviews() {
  const [studentEmail, setStudentEmail] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Interview scheduled with ${studentEmail} on ${interviewDate}. Link sent!`);
      setStudentEmail("");
      setInterviewDate("");
      setMeetLink("");
      
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-mono">
      <div className="border-b border-emerald-500/30 pb-4">
        <h1 className="text-2xl font-bold text-white mb-1 uppercase flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-500" /> Mock_Interviews
        </h1>
        <p className="text-emerald-600 text-sm uppercase">&gt; Schedule interview and send Google Meet link.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 md:p-8 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        
        <h2 className="text-lg font-bold text-emerald-500 mb-6 uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Schedule_New_Session
        </h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-sm font-bold uppercase">
            &gt; {successMessage}
          </div>
        )}

        <form onSubmit={handleSchedule} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <User className="w-4 h-4" /> Student_Email
              </label>
              <input 
                type="email" 
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors"
                placeholder="student@example.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date_&_Time
              </label>
              <input 
                type="datetime-local" 
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
                <Video className="w-4 h-4" /> Google_Meet_Link
              </label>
              <input 
                type="url" 
                required
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="w-full bg-[#050505] border border-emerald-900/50 focus:border-emerald-500 p-3 text-white outline-none transition-colors"
                placeholder="https://meet.google.com/abc-defg-hij"
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
                <Send className="w-5 h-5 fill-current" /> Schedule_&_Send_Link
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
