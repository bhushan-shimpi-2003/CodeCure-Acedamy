import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import Overview from "../components/dashboard/views/Overview";
import Lectures from "../components/dashboard/views/Lectures";
import Assignments from "../components/dashboard/views/Assignments";
import Career from "../components/dashboard/views/Career";
import StudentDoubts from "../components/dashboard/views/StudentDoubts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case "overview": return <Overview />;
      case "lectures": return <Lectures />;
      case "assignments": return <Assignments />;
      case "career": return <Career />;
      case "doubts": return <StudentDoubts />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-emerald-50 flex overflow-hidden font-mono selection:bg-emerald-500/30 selection:text-emerald-200 matrix-bg scanlines">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
