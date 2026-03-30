import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Codecure Academy
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Empowering the next generation of modern tech professionals with real-world skills and industry-standard training.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-slate-50 p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="bg-slate-50 p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-slate-50 p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Course Catalog</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Contact</Link></li>
              <li><Link to="/courses" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Syllabus</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">hello@codecureacedamy.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">Tech Park, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Codecure Acedamy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
