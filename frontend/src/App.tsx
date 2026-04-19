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
import { Capacitor } from "@capacitor/core";
import WebLayout from "./layouts/WebLayout";
import AppLayout from "./layouts/AppLayout";

// Dynamically choose layout based on platform
const isApp = Capacitor.isNativePlatform();
const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  return isApp ? <AppLayout>{children}</AppLayout> : <WebLayout>{children}</WebLayout>;
};

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

import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on their role if they try to access a page they shouldn't
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React Router v7 Routes component type doesn't include key, but React elements accept it */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><ResponsiveLayout><LandingPage /></ResponsiveLayout></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><ResponsiveLayout><Login /></ResponsiveLayout></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><ResponsiveLayout><Signup /></ResponsiveLayout></PageWrapper>} />
        <Route path="/courses" element={<PageWrapper><ResponsiveLayout><Courses /></ResponsiveLayout></PageWrapper>} />
        <Route path="/courses/:id" element={<PageWrapper><ResponsiveLayout><CourseDetail /></ResponsiveLayout></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><ResponsiveLayout><Checkout /></ResponsiveLayout></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><ResponsiveLayout><About /></ResponsiveLayout></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ResponsiveLayout><Contact /></ResponsiveLayout></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><ResponsiveLayout><Terms /></ResponsiveLayout></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><ResponsiveLayout><Privacy /></ResponsiveLayout></PageWrapper>} />
        <Route path="/refund" element={<PageWrapper><ResponsiveLayout><Refund /></ResponsiveLayout></PageWrapper>} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><TeacherDashboard /></PageWrapper></ProtectedRoute>} />
        
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
