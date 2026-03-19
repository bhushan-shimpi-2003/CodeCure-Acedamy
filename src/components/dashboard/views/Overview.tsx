import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Calendar, Users, Terminal, Youtube, BookOpen, CheckCircle } from "lucide-react";

export default function Overview() {
  const [featuredVideoId, setFeaturedVideoId] = useState<string | null>(null);
  const [requestedCourses, setRequestedCourses] = useState<string[]>([]);
  const [assignedCourses, setAssignedCourses] = useState<string[]>([]);

  const CURRENT_STUDENT_ID = "STD_001";
  const availableCourses = ["Playwright Master", "Selenium Pro", "API Testing", "React Masterclass"];

  useEffect(() => {
    const savedLink = localStorage.getItem("sharedYoutubeLink");
    if (savedLink) {
      // Extract YouTube ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = savedLink.match(regExp);
      if (match && match[2].length === 11) {
        setFeaturedVideoId(match[2]);
      }
    }

    // Check requested courses
    const savedRequests = localStorage.getItem(`requested_courses_${CURRENT_STUDENT_ID}`);
    if (savedRequests) {
      setRequestedCourses(JSON.parse(savedRequests));
    }

    // Check assigned courses
    const savedAssigned = localStorage.getItem(`assigned_courses_${CURRENT_STUDENT_ID}`);
    if (savedAssigned) {
      setAssignedCourses(JSON.parse(savedAssigned));
    }
  }, []);

  const handleRequestEnrollment = (course: string) => {
    const newRequests = [...requestedCourses, course];
    setRequestedCourses(newRequests);
    localStorage.setItem(`requested_courses_${CURRENT_STUDENT_ID}`, JSON.stringify(newRequests));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-mono">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none p-6 md:p-8 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase flex items-center gap-2">
              <Terminal className="w-6 h-6 text-emerald-500" /> SYS_LOGIN: ALEX_DEV
            </h1>
            <p className="text-emerald-600 text-sm md:text-base max-w-xl">
              &gt; "Success is not final, failure is not fatal: it is the courage to continue that counts."<br/>
              &gt; Executing Playwright Automation Master Program...
            </p>
          </div>
          <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-none min-w-[200px]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs text-emerald-500 font-bold uppercase">Overall_Progress</span>
              <span className="text-xl font-bold text-emerald-400">42%</span>
            </div>
            <div className="w-full bg-[#111] rounded-none h-2 overflow-hidden border border-emerald-900">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-emerald-500 h-2 rounded-none shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Catalog Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-white uppercase">Course_Catalog</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCourses.map((course, i) => {
            const isRequested = requestedCourses.includes(course);
            const isAssigned = assignedCourses.includes(course);

            return (
              <motion.div 
                key={course}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-emerald-500/30 p-6 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:border-emerald-500/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                    <h3 className="text-lg font-bold text-white uppercase">{course}</h3>
                  </div>
                  <p className="text-sm text-emerald-600 mb-6">
                    Master the concepts of {course} with our comprehensive video lectures, assignments, and real-world projects.
                  </p>
                </div>
                
                {isAssigned ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-sm font-bold uppercase">
                    <CheckCircle className="w-4 h-4" /> Enrolled
                  </div>
                ) : isRequested ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold uppercase">
                    <CheckCircle className="w-4 h-4" /> Request_Pending
                  </div>
                ) : (
                  <button 
                    onClick={() => handleRequestEnrollment(course)}
                    className="w-full py-3 bg-[#050505] border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors text-sm font-bold uppercase"
                  >
                    Request_Enrollment
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
