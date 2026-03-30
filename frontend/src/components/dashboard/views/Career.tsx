import { API_URL, API_BASE_URL } from '../../../config';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Briefcase, Video, ExternalLink, Calendar, Link as LinkIcon, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function Career() {
  const { token } = useAuth();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!token) return;
        
        const [resInt, resJobs] = await Promise.all([
          fetch(`${API_URL}/interviews/me`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_URL}/jobs`, { headers: { "Authorization": `Bearer ${token}` } })
        ]);
        
        const dataInt = await resInt.json();
        const dataJobs = await resJobs.json();
        
        if (dataInt.success) setInterviews(dataInt.data);
        if (dataJobs.success) setJobs(dataJobs.data);
      } catch (err) {
        console.error("Failed to fetch career data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const upcomingInterviews = interviews.filter(i => i.status === 'scheduled');
  const pastInterviews = interviews.filter(i => i.status === 'completed');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" /> Career & Placement
        </h1>
        <p className="text-slate-500 text-sm">Prepare for interviews and track applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Interviews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" /> Mock Interviews
            </h2>
          </div>

          <div className="mb-8">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview) => (
                <div key={interview.id} className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <h3 className="text-sm font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Upcoming: {interview.title || "Interview"}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Date & Time</p>
                      <p className="text-sm text-slate-900 font-bold">
                        {new Date(interview.scheduled_time).toLocaleString()}
                      </p>
                    </div>
                    
                    {(interview.meeting_link || interview.meet_link) && (
                      <div className="pt-2">
                        <a href={interview.meeting_link || interview.meet_link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors bg-blue-600 px-5 py-2.5 rounded-xl shadow-sm w-full sm:w-auto">
                          <Video className="w-4 h-4 flex-shrink-0" /> Join Meeting
                        </a>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-amber-200/50">
                      <p className="text-sm text-amber-700">Please join 5 minutes early. Ensure your camera and microphone are working.</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm">
                No upcoming mock interviews scheduled.
              </div>
            )}
          </div>

          <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">History Log</h3>
          <div className="space-y-3 flex-1">
            {pastInterviews.length > 0 ? (
              pastInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{interview.title || "Technical Round"}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {new Date(interview.scheduled_time).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">{interview.score ? `${interview.score}/10` : 'Completed'}</div>
                      <button className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mt-1">View Log</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 text-slate-400 text-xs italic">
                No past interventions logged yet.
              </div>
            )}
          </div>
        </motion.div>

        {/* Job Openings */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Briefcase className="w-5 h-5 text-blue-600" /> Active Job Openings
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">{job.company} • {job.location || 'Remote'}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm font-bold text-blue-600">{job.salary || 'Not specified'}</span>
                      {job.apply_url && (
                        <a href={job.apply_url} target="_blank" rel="noreferrer" className="text-xs font-semibold bg-white text-blue-600 border border-blue-200 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shadow-sm inline-block">Apply</a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-slate-400 text-xs italic">
                  No active job openings at the moment.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
