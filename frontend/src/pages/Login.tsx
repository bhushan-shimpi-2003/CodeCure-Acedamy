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
      className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-slate-50 selection:bg-blue-100 selection:text-blue-900 pt-20"
    >
      <div className="w-full max-w-md p-8 bg-white border border-slate-200 shadow-xl rounded-2xl relative z-10">
        
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
          Welcome <span className="text-blue-600">Back</span>
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          Enter your credentials to access your account.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
              placeholder="student@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
              placeholder="••••••••"
              required
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold shadow-lg shadow-blue-600/20 group transition-all">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-bold underline decoration-blue-200 underline-offset-4 transition-colors">Sign up here</Link>.
        </div>
      </div>
    </motion.div>
  );
}
