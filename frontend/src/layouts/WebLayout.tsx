import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// Layout exclusively for Web browsers
const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WebLayout;
