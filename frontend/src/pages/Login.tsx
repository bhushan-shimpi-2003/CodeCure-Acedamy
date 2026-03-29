import React, { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data.session.access_token, data.data.user);
        
        // Redirect based on role
        if (data.data.user.role === "admin") {
          navigate("/admin");
        } else if (data.data.user.role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen w-full bg-slate-50 p-4 md:p-8 pt-16 md:pt-20 pb-8 selection:bg-blue-100 selection:text-blue-900"
    >
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 min-h-[500px]">
        
        {/* Left Side - Visuals */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-8 bg-blue-900 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
             <div className="absolute inset-0 bg-blue-900/60 backdrop-mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CodeCure Academy</span>
          </div>

          <div className="relative z-10 text-white mt-auto">
            <h2 className="text-2xl font-bold mb-3 leading-tight">
              Unlock Your Potential,<br/>Shape Your Future.
            </h2>
            <p className="text-blue-100/80 text-sm max-w-sm">
              Join thousands of students learning in-demand tech skills from industry experts.
            </p>
            <div className="flex gap-2 mt-6">
               <div className="w-8 h-1 bg-white rounded-full"></div>
               <div className="w-2 h-1 bg-white/40 rounded-full"></div>
               <div className="w-2 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
          <div className="w-full max-w-[340px] mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4">
                Sign up
              </Link>
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium"
                  placeholder="Email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" disabled={isLoading} className="w-full h-12 mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold transition-all">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
