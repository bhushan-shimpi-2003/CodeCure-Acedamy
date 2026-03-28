import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Calendar, Users, Terminal, Youtube, BookOpen, CheckCircle, GraduationCap } from "lucide-react";

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
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."<br/>
              Ready to continue your Playwright Automation Master Program?
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl min-w-[240px]">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-medium text-slate-500">Overall Progress</span>
              <span className="text-2xl font-bold text-blue-600">42%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-blue-600 h-2.5 rounded-full"
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
        className="space-y-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Course Catalog</h2>
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
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{course}</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Master the concepts of {course} with our comprehensive video lectures, assignments, and real-world projects.
                  </p>
                </div>
                
                {isAssigned ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> Enrolled
                  </div>
                ) : isRequested ? (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> Request Pending
                  </div>
                ) : (
                  <button 
                    onClick={() => handleRequestEnrollment(course)}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 rounded-xl transition-all text-sm font-semibold"
                  >
                    Request Enrollment
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
