import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Coducure
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link to="/courses" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Courses</Link>
          <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
          <div className="flex items-center gap-4 ml-2">
            <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Log In</Link>
            <Link to="/signup">
              <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 font-medium shadow-md shadow-blue-500/20">
                Join Now
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-2 shadow-xl">
          <Link to="/courses" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 p-3 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
          <Link to="/about" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 p-3 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 p-3 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="h-px bg-slate-100 my-2"></div>
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="default" className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium py-6">
              Join Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
