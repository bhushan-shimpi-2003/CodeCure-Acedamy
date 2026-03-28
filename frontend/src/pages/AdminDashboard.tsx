import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopBar from "../components/admin/AdminTopBar";
import AdminOverview from "../components/admin/views/AdminOverview";
import StudentManagement from "../components/admin/views/StudentManagement";
import AdminCourses from "../components/admin/views/AdminCourses";
import AdminAssignments from "../components/admin/views/AdminAssignments";
import AdminInterviews from "../components/admin/views/AdminInterviews";
import AdminDoubts from "../components/admin/views/AdminDoubts";
import StaffManagement from "../components/admin/views/StaffManagement";
import AdminFinance from "../components/admin/views/AdminFinance";
import AdminFeedback from "../components/admin/views/AdminFeedback";
import AdminSettings from "../components/admin/views/AdminSettings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case "overview": return <AdminOverview />;
      case "students": return <StudentManagement />;
      case "courses": return <AdminCourses />;
      case "assignments": return <AdminAssignments />;
      case "interviews": return <AdminInterviews />;
      case "doubts": return <AdminDoubts />;
      case "staff": return <StaffManagement />;
      case "finance": return <AdminFinance />;
      case "feedback": return <AdminFeedback />;
      case "settings": return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="admin-theme min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <AdminTopBar setIsSidebarOpen={setIsSidebarOpen} />
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
