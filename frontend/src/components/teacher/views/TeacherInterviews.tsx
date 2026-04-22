import { API_URL, API_BASE_URL } from '../../../config';
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Video, Calendar, Send, User, GraduationCap, Loader2, BookOpen } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/useAuth";

const API = API_URL;

export default function TeacherInterviews() {
  const { token } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [interviewTitle, setInterviewTitle] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data for dropdowns
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (!token) return;

      // 1. Fetch teacher's courses
      const coursesRes = await fetch(`${API}/courses/teacher/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const coursesData = await coursesRes.json();
      if (coursesData.success) {
        setCourses(coursesData.data);
      }

      // 2. Fetch all enrollments (teacher has access)
      const enrollRes = await fetch(`${API}/enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const enrollData = await enrollRes.json();
      if (enrollData.success) {
        // Build unique student list with course info
        const studentMap = new Map();
        enrollData.data.forEach((e: any) => {
          if (e.student_status === 'active') {
            const key = `${e.student_id}_${e.course_id}`;
            if (!studentMap.has(key)) {
              studentMap.set(key, {
                student_id: e.student_id,
                student_name: e.profiles?.name || 'Unknown',
                student_email: e.profiles?.email || '',
                course_id: e.course_id,
                course_title: e.courses?.title || 'Unknown Course',
              });
            }
          }
        });
        setStudents(Array.from(studentMap.values()));
      }

      // 3. Fetch teacher's interviews
      const ivRes = await fetch(`${API}/interviews/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ivData = await ivRes.json();
      if (ivData.success) {
        setInterviews(ivData.data);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter students when course changes
  useEffect(() => {
    if (selectedCourseId) {
      const filtered = students.filter(s => s.course_id === selectedCourseId);
      setFilteredStudents(filtered);
      setSelectedStudentId(""); // reset student selection
    } else {
      setFilteredStudents([]);
      setSelectedStudentId("");
    }
  }, [selectedCourseId, students]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedCourseId) {
      setError("Please select both a course and a student.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    const selectedStudent = students.find(s => s.student_id === selectedStudentId && s.course_id === selectedCourseId);

    try {
      const res = await fetch(`${API}/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_id: selectedStudentId,
          course_id: selectedCourseId,
          title: interviewTitle || "Mock Interview",
          scheduled_at: interviewDate,
          meeting_link: meetLink,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Interview scheduled with ${selectedStudent?.student_name || 'student'} on ${new Date(interviewDate).toLocaleString()}.`);
        setSelectedStudentId("");
        setSelectedCourseId("");
        setInterviewTitle("");
        setInterviewDate("");
        setMeetLink("");
        fetchData();
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setError(data.error || "Failed to schedule interview");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async (interviewId: string) => {
    const scoreStr = prompt("Enter interview score (out of 10):");
    if (!scoreStr) return;
    const score = parseInt(scoreStr, 10);
    if (isNaN(score) || score < 0 || score > 10) {
      alert("Score must be between 0 and 10.");
      return;
    }

    try {
      const res = await fetch(`${API}/interviews/${interviewId}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score, notes: "" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData(); // refresh list
      }
    } catch (err) {
      alert("Failed to complete interview.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" /> Mock Interviews
        </h1>
        <p className="text-slate-500 text-sm">Schedule interview and send Google Meet link.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
        
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" /> Schedule New Session
        </h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSchedule} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Course Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" /> Select Course
              </label>
              <Select
                  required
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  icon={<BookOpen className="w-4 h-4 text-slate-400" />}
                >
                  <option value="">-- Choose a course --</option>
                  {courses.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
              </Select>
            </div>

            {/* Student Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Select Student
              </label>
              <Select
                  required
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  disabled={!selectedCourseId}
                  icon={<User className="w-4 h-4 text-slate-400" />}
                >
                  <option value="">
                    {!selectedCourseId 
                      ? "-- Select a course first --" 
                      : filteredStudents.length === 0 
                        ? "-- No students enrolled --"
                        : "-- Choose a student --"
                    }
                  </option>
                  {filteredStudents.map((s: any) => (
                    <option key={s.student_id} value={s.student_id}>
                      {s.student_name} ({s.student_email})
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="space-y-5">
            {/* Interview Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" /> Interview Title
              </label>
              <input 
                type="text"
                value={interviewTitle}
                onChange={(e) => setInterviewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all text-sm"
                placeholder="e.g. Technical Round 1, HR Interview"
              />
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Date & Time
              </label>
              <input 
                type="datetime-local" 
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all text-sm"
              />
            </div>

            {/* Meet Link */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4 text-slate-400" /> Google Meet Link
              </label>
              <input 
                type="url" 
                required
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 p-3.5 rounded-xl text-slate-900 outline-none transition-all text-sm"
                placeholder="https://meet.google.com/abc-defg-hij"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !selectedStudentId || !selectedCourseId}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Schedule & Send Link
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Scheduled Interviews List */}
      {interviews.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">
            Scheduled Interviews ({interviews.length})
          </h2>
          <div className="space-y-3">
            {interviews.map((iv: any) => (
              <div key={iv.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl group hover:border-blue-200 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{iv.profiles?.name || iv.title || 'Student'}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {iv.title && <span className="text-blue-600 font-medium">{iv.title} · </span>}
                    {new Date(iv.scheduled_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {iv.status === 'scheduled' && (
                    <>
                      {(iv.meet_link || iv.meeting_link) && (
                        <a
                          href={iv.meet_link || iv.meeting_link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" /> Join Meeting
                        </a>
                      )}
                      <button
                        onClick={() => handleComplete(iv.id)}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Complete
                      </button>
                    </>
                  )}
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg border ${
                    iv.status === 'completed' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {iv.status || 'scheduled'}
                    {iv.score ? ` · ${iv.score}/10` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
