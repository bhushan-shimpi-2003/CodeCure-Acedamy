import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import TeacherSidebar from "../components/teacher/TeacherSidebar";
import TeacherTopBar from "../components/teacher/TeacherTopBar";
import TeacherOverview from "../components/teacher/views/TeacherOverview";
import TeacherClasses from "../components/teacher/views/TeacherClasses";
import TeacherAssignments from "../components/teacher/views/TeacherAssignments";
import TeacherStudents from "../components/teacher/views/TeacherStudents";
import TeacherInterviews from "../components/teacher/views/TeacherInterviews";
import TeacherDoubts from "../components/teacher/views/TeacherDoubts";
import TeacherProfile from "../components/teacher/views/TeacherProfile";
import TeacherLessons from "../components/teacher/views/TeacherLessons";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case "overview": return <TeacherOverview />;
      case "lessons": return <TeacherLessons />;
      case "courses": return <TeacherClasses />;
      case "students": return <TeacherStudents />;
      case "assignments": return <TeacherAssignments />;
      case "interviews": return <TeacherInterviews />;
      case "doubts": return <TeacherDoubts />;
      case "profile": return <TeacherProfile />;
      default: return <TeacherOverview />;
    }
  };

  return (
    <div className="teacher-theme h-screen w-full bg-slate-50 text-slate-900 flex overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <TeacherSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TeacherTopBar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
