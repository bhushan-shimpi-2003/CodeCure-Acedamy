import { motion } from "motion/react";
import { Linkedin, Award, Users, Star, UserCircle } from "lucide-react";

export default function Trainer() {
  return (
    <section id="trainer" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Trainer Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 relative z-10 bg-slate-100 shadow-xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Rahul Sharma</h3>
                <p className="text-blue-200 font-medium">Lead SDET & Automation Architect</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-blue-100 rounded-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-blue-50 rounded-3xl -z-10"></div>
          </motion.div>

          {/* Trainer Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <UserCircle className="w-4 h-4" />
                <span>Meet Your Instructor</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Learn from an <span className="text-blue-600">Industry Expert</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                With over 8 years of experience building automation frameworks for Fortune 500 companies, Rahul brings real-world challenges and solutions directly to the classroom.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                <p className="text-lg text-slate-700 leading-relaxed italic font-medium">
                  "My goal is not just to teach you Playwright, but to change how you think about testing and software quality."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-2xl font-bold text-slate-900 mb-1">8+ Years</h4>
                <p className="text-slate-500 text-sm font-medium">Industry Experience</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-2xl font-bold text-slate-900 mb-1">1500+</h4>
                <p className="text-slate-500 text-sm font-medium">Students Mentored</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Star className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-2xl font-bold text-slate-900 mb-1">4.9/5</h4>
                <p className="text-slate-500 text-sm font-medium">Average Rating</p>
              </div>
              <a href="#" className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors flex flex-col justify-center items-center text-center group">
                <Linkedin className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-blue-700 font-bold">Connect on LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
