import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Layout for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

// Page wrapper for animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React Router v7 Routes component type doesn't include key, but React elements accept it */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><PublicLayout><LandingPage /></PublicLayout></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><PublicLayout><Login /></PublicLayout></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><PublicLayout><Signup /></PublicLayout></PageWrapper>} />
        <Route path="/courses" element={<PageWrapper><PublicLayout><Courses /></PublicLayout></PageWrapper>} />
        <Route path="/courses/:id" element={<PageWrapper><PublicLayout><CourseDetail /></PublicLayout></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><PublicLayout><Checkout /></PublicLayout></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><PublicLayout><About /></PublicLayout></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><PublicLayout><Contact /></PublicLayout></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><PublicLayout><Terms /></PublicLayout></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><PublicLayout><Privacy /></PublicLayout></PageWrapper>} />
        <Route path="/refund" element={<PageWrapper><PublicLayout><Refund /></PublicLayout></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        <Route path="/teacher" element={<PageWrapper><TeacherDashboard /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
