import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    role: "SDET @ Amazon",
    text: "I was stuck in manual testing for 3 years. This course completely changed my career trajectory. The Playwright framework we built is exactly what I use at work now.",
    hike: "150% Salary Hike",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Rahul V.",
    role: "Automation Engineer @ TCS",
    text: "The best part of Coducure is the 1-on-1 mentorship. Rahul sir's way of explaining complex JS concepts made automation feel easy. Highly recommended!",
    hike: "120% Salary Hike",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Sneha G.",
    role: "QA Lead @ Startup",
    text: "I tried learning from YouTube but got confused. This structured roadmap and the real-time e-commerce project gave me the confidence to crack 4 interviews.",
    hike: "200% Salary Hike",
    avatar: "https://i.pravatar.cc/150?u=sneha"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            <span>Student Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Hear From Our <span className="text-blue-600">Alumni</span>
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read about the career transformations of our successful students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-semibold px-3 py-1.5 rounded-full text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                {testimonial.hike}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
