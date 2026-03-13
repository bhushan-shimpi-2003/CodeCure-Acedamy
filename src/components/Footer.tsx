import { Link } from "react-router-dom";
import { Terminal, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-emerald-500/30 pt-16 pb-8 font-mono relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Terminal className="w-6 h-6 text-emerald-500" />
              <span className="font-bold text-xl tracking-tight text-white uppercase">
                Coducure<span className="text-emerald-500 animate-pulse">_</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the next generation of SDETs and Automation Engineers with real-world skills and industry-standard frameworks.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-emerald-950/30 p-2 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="bg-emerald-950/30 p-2 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-emerald-950/30 p-2 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-emerald-500 mb-4 uppercase text-sm">&gt; Quick_Links</h3>
            <ul className="space-y-3">
              <li><a href="/#curriculum" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Course Curriculum</a></li>
              <li><a href="/#projects" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Real Projects</a></li>
              <li><a href="/#placement" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Placement Support</a></li>
              <li><a href="/#faq" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> FAQs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-emerald-500 mb-4 uppercase text-sm">&gt; Legal_Docs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Terms & Conditions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"><span className="text-emerald-500/50">-</span> Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-emerald-500 mb-4 uppercase text-sm">&gt; Network_Config</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">hello@coducure.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">Tech Park, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-500/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left uppercase">
            &copy; {new Date().getFullYear()} Coducure Academy. All rights reserved.
          </p>
          <p className="text-emerald-500/50 text-xs flex items-center gap-1 uppercase font-bold">
            SYSTEM_STATUS: ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}
