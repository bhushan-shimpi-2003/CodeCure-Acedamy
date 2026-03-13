import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, Menu, X } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-emerald-500/30 py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-emerald-500" />
          <span className="font-bold text-xl tracking-tight text-white uppercase">
            Coducure<span className="text-emerald-500 animate-pulse">_</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#curriculum" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">./curriculum</a>
          <a href="/#projects" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">./projects</a>
          <a href="/#trainer" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">./trainer</a>
          <Link to="/login" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors font-bold">./login</Link>
          <Link to="/signup">
            <Button variant="default" className="bg-emerald-500 text-black hover:bg-emerald-400 rounded-none font-bold border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              INIT_ENROLL
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-emerald-500 hover:text-emerald-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-emerald-500/30 p-4 flex flex-col gap-4 shadow-xl font-mono">
          <a href="/#curriculum" className="text-sm text-emerald-500 hover:text-emerald-400 p-2 border border-emerald-500/20 bg-emerald-950/20" onClick={() => setIsMobileMenuOpen(false)}>&gt; curriculum</a>
          <a href="/#projects" className="text-sm text-emerald-500 hover:text-emerald-400 p-2 border border-emerald-500/20 bg-emerald-950/20" onClick={() => setIsMobileMenuOpen(false)}>&gt; projects</a>
          <a href="/#trainer" className="text-sm text-emerald-500 hover:text-emerald-400 p-2 border border-emerald-500/20 bg-emerald-950/20" onClick={() => setIsMobileMenuOpen(false)}>&gt; trainer</a>
          <Link to="/login" className="text-sm text-emerald-500 hover:text-emerald-400 p-2 border border-emerald-500/20 bg-emerald-950/20 font-bold" onClick={() => setIsMobileMenuOpen(false)}>&gt; login</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="default" className="w-full mt-2 bg-emerald-500 text-black rounded-none font-bold">
              INIT_ENROLL
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
