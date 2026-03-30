import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileCode2, UploadCloud, CheckSquare, Clock, FileText, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { API_URL } from "../../../config";

export default function Assignments() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!token) return;
        
        // 1. Fetch active courses
        const enrollRes = await fetch(`${API_URL}/enrollments/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        const activeCourses = enrollData.success 
          ? enrollData.data.filter((e: any) => e.student_status === 'active')
          : [];

        // 2. Map over active courses and fetch assignments
        let allAssignments: any[] = [];
        for (const course of activeCourses) {
          try {
            const courseId = course.course_id;
            const assignRes = await fetch(`${API_URL}/assignments/course/${courseId}`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            const assignData = await assignRes.json();
            if (assignData.success && assignData.data.length > 0) {
              allAssignments = [...allAssignments, ...assignData.data];
            }
          } catch (err) {
            console.error("Failed to fetch assignments for course:", course.course_id);
          }
        }
        setAssignments(allAssignments);

        // 3. Fetch submissions for current student
        try {
          const subRes = await fetch(`${API_URL}/assignments/submissions/me`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const subData = await subRes.json();
          if (subData.success) {
            setSubmissions(subData.data);
          }
        } catch (err) {
          console.error("Failed to fetch submissions");
        }
      } catch (err) {
        console.error("Error fetching assignments data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (assignmentId: string) => {
    const link = prompt("Enter Git repository or submission link:");
    if (!link) return;
    
    try {
      const res = await fetch(`${API_URL}/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ submission_link: link })
      });
      const data = await res.json();
      if (data.success) {
        alert("Assignment submitted successfully!");
        setSubmissions([data.data, ...submissions]);
      } else {
        alert(data.error || "Failed to submit assignment.");
      }
    } catch (err) {
      alert("Error processing submission");
    }
  };

  const getTaskStatus = (assignmentId: string) => {
    const submission = submissions.find(s => s.assignment_id === assignmentId);
    if (!submission) return { status: 'pending', score: '-' };
    if (submission.status === 'graded') return { status: 'graded', score: `${submission.score || 0}/10` };
    return { status: 'submitted', score: 'Pending' };
  };

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
          <FileText className="w-6 h-6 text-blue-600" /> Tasks & Assignments
        </h1>
        <p className="text-slate-500 text-sm">Apply knowledge through practical execution.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
          <FileCode2 className="w-5 h-5 text-blue-600" /> Module Assignments
        </h2>
        
        {assignments.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 text-slate-500 shadow-sm">
            No assignments found for your enrolled classes.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.map((task, i) => {
              const { status, score } = getTaskStatus(task.id);
              const dueDate = new Date(task.due_date).toLocaleDateString();

              return (
                <motion.div 
                  key={task.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 w-1 h-full ${
                    status === 'graded' ? 'bg-emerald-500' :
                    status === 'submitted' ? 'bg-blue-500' :
                    'bg-amber-500'
                  }`}></div>
                  <div className="flex justify-between items-start mb-4 pl-3">
                    <h3 className="font-bold text-slate-900 text-base">{task.title}</h3>
                    {status === 'graded' && <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">Graded</span>}
                    {status === 'submitted' && <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">Submitted</span>}
                    {status === 'pending' && <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">Action Req</span>}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-medium pl-3">
                    <div className="flex items-center gap-4 text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {dueDate}</span>
                      <span className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> Score: {score}</span>
                    </div>
                    
                    {status === 'pending' && (
                      <button 
                        onClick={() => handleSubmit(task.id)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-semibold transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs"
                      >
                        <UploadCloud className="w-4 h-4" /> Submit
                      </button>
                    )}
                    {status === 'submitted' && (
                      <button disabled className="text-slate-400 flex items-center gap-1.5 font-semibold">
                        Waiting for Grade
                      </button>
                    )}
                    {status === 'graded' && (
                      <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 font-semibold transition-colors bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs">
                        View Log
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
