import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Briefcase, Building, MapPin, DollarSign, Link as LinkIcon, Plus, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { API_URL } from '../../config';

export default function JobsManagement({ role = "Admin" }: { role?: "Admin" | "Teacher" }) {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    apply_url: ""
  });

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      if (!token) return;
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({ title: "", company: "", location: "", salary: "", apply_url: "" });
        fetchJobs(); // refresh
      } else {
        alert(data.error || "Failed to add job");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding job");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setJobs(jobs.filter(j => j.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" /> {role} Job Board
          </h1>
          <p className="text-slate-500 text-sm">Post and manage job openings for students.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 w-fit"
        >
          {showAddForm ? "Cancel" : <><Plus className="w-4 h-4" /> Post Job</>}
        </button>
      </div>

      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" /> Create New Job Opening
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. Frontend Developer" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
              <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. Google" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. Remote, Bangalore" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Salary/CTC</label>
              <input type="text" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. 12-15 LPA" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Application URL</label>
              <input type="url" value={formData.apply_url} onChange={e => setFormData({...formData, apply_url: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="https://..." />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow flex items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Post Opening
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center text-slate-500">
          No active job openings available.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm font-medium text-slate-500">
                    <Building className="w-4 h-4" /> {job.company}
                  </div>
                </div>
                <button onClick={() => handleDelete(job.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><MapPin className="w-4 h-4" /> Location</span>
                  <span className="font-bold text-slate-900">{job.location || "Not specified"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><DollarSign className="w-4 h-4" /> Salary</span>
                  <span className="font-bold text-slate-900">{job.salary || "Not specified"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><LinkIcon className="w-4 h-4" /> Apply URL</span>
                  {job.apply_url ? (
                    <a href={job.apply_url} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline truncate max-w-50 block">Link</a>
                  ) : <span className="font-bold text-slate-400">None</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
