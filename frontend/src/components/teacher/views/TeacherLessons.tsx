import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PlayCircle, Edit, Trash2, LayoutDashboard, Loader2, Save, X, BookOpen } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function TeacherLessons() {
  const { token, user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [editingLesson, setEditingLesson] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [token, user]);

  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    } else {
      setLessons([]);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const url = user?.role === 'admin' 
        ? `${API}/courses/admin/all` 
        : `${API}/courses/teacher/my`;
        
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        if (data.data.length > 0) setSelectedCourseId(data.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLessons = async (courseId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/lessons/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLessons(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch lessons", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const res = await fetch(`${API}/lessons/${lessonId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLessons(lessons.filter(l => l.id !== lessonId));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const startEdit = (lesson: any) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.title);
    setEditUrl(lesson.video_url || "");
    setEditContent(lesson.content || "");
  };

  const handleUpdate = async () => {
    if (!editingLesson) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${API}/lessons/${editingLesson.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          video_url: editUrl,
          content: editContent,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLessons(lessons.map(l => l.id === editingLesson.id ? data.data : l));
        setEditingLesson(null);
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-blue-600" /> Published Content
        </h1>
        <p className="text-slate-500 text-sm">View, update, or remove your published lessons.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
          <Select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            icon={<BookOpen className="w-4 h-4 text-slate-400" />}
            className="md:w-1/2"
          >
            {courses.length === 0 && <option value="">No courses found</option>}
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : lessons.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
            No lessons published in this course yet.
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <motion.div 
                key={lesson.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-blue-400 transition-colors"
              >
                {editingLesson?.id === lesson.id ? (
                  <div className="w-full space-y-3">
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 outline-none" 
                      placeholder="Lesson Title"
                    />
                    <input 
                      type="text" 
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 outline-none" 
                      placeholder="Video Link or <iframe> code"
                    />
                    <textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-blue-500 outline-none resize-none" 
                      placeholder="Notes / Content"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingLesson(null)} 
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-200 flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                      <button 
                        onClick={handleUpdate} 
                        disabled={isSaving}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1 disabled:opacity-50"
                      >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Save className="w-3.5 h-3.5" />} Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate" title={lesson.title}>{lesson.title}</h3>
                      <p className="text-xs text-blue-600 truncate mt-1">{lesson.video_url}</p>
                      {lesson.content && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{lesson.content}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => startEdit(lesson)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                        title="Edit Lesson"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(lesson.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                        title="Delete Lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
