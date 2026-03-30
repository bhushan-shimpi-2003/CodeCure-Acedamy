import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  onProfileClick?: () => void;
}

export default function UserMenu({ onProfileClick }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CC';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 md:gap-3 pl-4 border-l border-slate-200 group"
      >
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user?.name || 'User'}</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role || 'Guest'}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-transparent group-hover:border-blue-200 transition-all shrink-0">
          {getInitials(user?.name || 'Code Cure')}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform hidden md:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{user?.role}</p>
            </div>
            
            <button 
              onClick={() => {
                setIsOpen(false);
                onProfileClick?.();
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              My Profile
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings
            </button>
            <div className="h-px bg-slate-100 my-1"></div>
            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
