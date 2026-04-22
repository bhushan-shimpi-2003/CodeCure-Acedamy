import { API_URL, API_BASE_URL } from '../../../config';
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen, Plus, Edit, Trash2, LayoutDashboard, Layers, ArrowLeft, Save, IndianRupee, Loader2, Users, Upload, UserCog, Activity } from "lucide-react";
import Select from "../../ui/Select";
import { useAuth } from "../../../context/useAuth";

interface Lesson {
  id: string;
  title: string;
  duration?: string;
  video_url?: string;
}

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons?: Lesson[];
}

interface Course {
 id: string;
 title: string;
 description: string;
 modules: Module[];
 students?: number;
 status: "active" | "draft";
 price: string | number;
 instructor_id?: string;
 thumbnail?: string;
 profiles?: { id?: string; name?: string; email?: string };
}

export default function AdminCourses() {
 const { token } = useAuth();
 const [courses, setCourses] = useState<Course[]>([]);
 const [teachers, setTeachers] = useState<{id: string, name: string, email: string}[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);
 const [isUploading, setIsUploading] = useState(false);

 const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
 const [activeTab, setActiveTab] = useState<'basic' | 'curriculum'>('basic');

 const fetchCourses = async () => {
   setIsLoading(true);
   try {
     const res = await fetch(`${API_URL}/courses/admin/all`, {
       headers: { "Authorization": `Bearer ${token}` }
     });
     const data = await res.json();
     if (data.success) {
       const formatted = data.data.map((c: any) => ({
         ...c,
         modules: c.modules || [],
         students: c.enrollment_count || 0
       }));
       setCourses(formatted);
     }
   } catch (err) {
     console.error("Failed to load courses", err);
   } finally {
     setIsLoading(false);
   }
 };

 const fetchTeachers = async () => {
   try {
     const res = await fetch(`${API_URL}/admin/staff`, {
       headers: { "Authorization": `Bearer ${token}` }
     });
     const data = await res.json();
     if (data.success) {
       setTeachers(data.data.filter((u: any) => u.role === 'teacher'));
     }
   } catch (e) {
     console.error(e);
   }
 };

 useEffect(() => {
   if (token) {
     fetchCourses();
     fetchTeachers();
   }
 }, [token]);

 const handleEditCourse = async (course: Course) => {
   setSelectedCourse({ ...course });
   setActiveTab('basic');
   try {
     const res = await fetch(`${API_URL}/courses/${course.id}/modules`);
     const data = await res.json();
     if (data.success) {
       setSelectedCourse(prev => prev ? { ...prev, modules: data.data } : null);
     }
   } catch (e) {
     console.error("Failed to load modules");
   }
 };

 const handleCreateCourse = () => {
   const newCourse: Course = {
     id: "new",
     title: "New Course",
     description: "",
     modules: [],
     students: 0,
     status: "draft",
     price: 0,
     instructor_id: "",
     thumbnail: ""
   };
   setSelectedCourse(newCourse);
   setActiveTab('basic');
 };

 const handleSaveCourse = async () => {
   if (!selectedCourse) return;
   setIsSaving(true);
   
   try {
     const isNew = selectedCourse.id === "new";
     const url = isNew ? `${API_URL}/courses` : `${API_URL}/courses/${selectedCourse.id}`;
     const method = isNew ? "POST" : "PUT";

     const payload: any = {
       title: selectedCourse.title,
       description: selectedCourse.description,
       status: selectedCourse.status,
       price: Number(selectedCourse.price) || 0,
       thumbnail: selectedCourse.thumbnail || null,
        modules: selectedCourse.modules || []
     };

     if (selectedCourse.instructor_id) {
       payload.instructor_id = selectedCourse.instructor_id;
     }

     const res = await fetch(url, {
       method,
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
       },
       body: JSON.stringify(payload)
     });

     const data = await res.json();
     if (data.success) {
       await fetchCourses(); // Refresh list to get real ID and updated fields
       setSelectedCourse(null);
     } else {
       alert(data.error || "Failed to save course");
     }
   } catch (err) {
     console.error(err);
     alert("Error saving course");
   } finally {
     setIsSaving(false);
   }
 };

 const handleUpdateField = (field: keyof Course, value: any) => {
   if (selectedCourse) {
     setSelectedCourse({ ...selectedCourse, [field]: value });
   }
 };

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (!file) return;

   setIsUploading(true);
   const formData = new FormData();
   formData.append('image', file);

   try {
     const res = await fetch(`${API_URL}/upload/image`, {
       method: "POST",
       headers: { "Authorization": `Bearer ${token}` },
       body: formData
     });
     const data = await res.json();
     if (data.success) {
       handleUpdateField('thumbnail', data.url);
     } else {
       alert(data.error || "Failed to upload image");
     }
   } catch (err) {
     console.error(err);
     alert("Error uploading image");
   } finally {
     setIsUploading(false);
   }
 };

 // Simplified Module UI handling (not fully wired to create real modules in backend for demo speed,
 // but UI updates locally)
 const handleAddModule = () => {
   if (selectedCourse) {
     const newModule: Module = {
       id: `temp_${Date.now()}`,
       title: "",
       duration: ""
     };
     setSelectedCourse({
       ...selectedCourse,
       modules: [...selectedCourse.modules, newModule]
     });
   }
 };

 const handleUpdateModule = (moduleId: string, field: keyof Module, value: string) => {
   if (selectedCourse) {
     const updatedModules = selectedCourse.modules.map(m => 
       m.id === moduleId ? { ...m, [field]: value } : m
     );
     setSelectedCourse({ ...selectedCourse, modules: updatedModules });
   }
 };

 const handleRemoveModule = (moduleId: string) => {
   if (selectedCourse) {
     const updatedModules = selectedCourse.modules.filter(m => m.id !== moduleId);
     setSelectedCourse({ ...selectedCourse, modules: updatedModules });
   }
 };

 const handleDeleteCourse = async (id: string) => {
   if (!confirm("Are you sure you want to delete this course?")) return;
   try {
     const res = await fetch(`${API_URL}/courses/${id}`, {
       method: "DELETE",
       headers: { "Authorization": `Bearer ${token}` }
     });
     if (res.ok) {
       setCourses(prev => prev.filter(c => c.id !== id));
     }
   } catch (err) {
     console.error("Failed to delete", err);
   }
 };

 if (selectedCourse) {
   return (
     <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4 sm:pt-8 w-full overflow-x-hidden">
       <div className="border-b border-slate-200 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
           <button 
             onClick={() => setSelectedCourse(null)} 
             className="text-blue-600 hover:text-slate-900 bg-slate-50 border border-slate-200 p-2 sm:p-2.5 rounded-xl transition-colors shrink-0"
           >
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
             <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
               <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> {selectedCourse.id === "new" ? 'New Course' : 'Edit Course'}
             </h1>
             <p className="text-slate-500 text-xs sm:text-sm ">&gt; {selectedCourse.title || 'Untitled Course'} [{selectedCourse.id}]</p>
           </div>
         </div>
         <div className="flex gap-3">
           <button 
             onClick={handleSaveCourse}
             disabled={isSaving}
             className="bg-blue-600 border border-blue-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
           >
             {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
             Save Changes
           </button>
         </div>
       </div>

       <div className="flex gap-4 border-b border-slate-100">
         <button 
           onClick={() => setActiveTab('basic')} 
           className={`pb-3 px-2 text-sm font-bold transition-colors ${activeTab === 'basic' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
         >
           Basic Info
         </button>
         <button 
           onClick={() => setActiveTab('curriculum')} 
           className={`pb-3 px-2 text-sm font-bold transition-colors ${activeTab === 'curriculum' ? 'text-slate-900 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
         >
           Curriculum & Modules
         </button>
       </div>

       {activeTab === 'basic' && (
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6 bg-white/90 backdrop-blur-xl border border-slate-200/60 p-4 sm:p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
         >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 md:col-span-2">
               <label className="text-xs text-blue-600 font-bold flex items-center gap-2">Course Title</label>
               <input 
                 type="text" 
                 value={selectedCourse.title} 
                 onChange={(e) => handleUpdateField('title', e.target.value)} 
                 placeholder="e.g. Advanced Playwright Automation"
                 className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-600 outline-none transition-colors" 
               />
             </div>
             
             <div className="space-y-2">
               <label className="text-xs text-blue-600 font-bold flex items-center gap-2">
                 <IndianRupee className="w-3.5 h-3.5" /> Course Fee (₹)
               </label>
               <input 
                 type="number" 
                 value={selectedCourse.price} 
                 onChange={(e) => handleUpdateField('price', e.target.value)} 
                 placeholder="e.g. 15000"
                 className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-600 outline-none transition-colors" 
               />
             </div>

             <div className="space-y-2">
               <label className="text-xs text-blue-600 font-bold ">Cover Image URL or Upload</label>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={selectedCourse.thumbnail || ""} 
                   onChange={(e) => handleUpdateField('thumbnail', e.target.value)} 
                   placeholder="e.g. https://example.com/image.jpg"
                   className="flex-1 w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-600 outline-none transition-colors" 
                 />
                 <div className="relative flex items-center shrink-0 border border-slate-200 bg-slate-100 hover:bg-slate-200 transition-colors">
                   <input 
                     type="file" 
                     accept="image/*" 
                     onChange={handleImageUpload} 
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     title="Upload Image"
                   />
                   <button type="button" disabled={isUploading} className="flex items-center gap-2 px-4 py-3 text-slate-700 font-bold disabled:opacity-50">
                     {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                     Upload
                   </button>
                 </div>
               </div>
             </div>

             <div className="space-y-2">
               <Select 
                 label="Status"
                 icon={<Activity className="w-4 h-4 text-blue-600" />}
                 value={selectedCourse.status} 
                 onChange={(e) => handleUpdateField('status', e.target.value as any)} 
               >
                 <option value="active">Active (Published)</option>
                 <option value="draft">Draft (Hidden)</option>
               </Select>
             </div>

             <div className="space-y-2">
               <Select 
                 label="Assign Teacher"
                 icon={<UserCog className="w-4 h-4 text-blue-600" />}
                 value={selectedCourse.instructor_id || ""} 
                 onChange={(e) => handleUpdateField('instructor_id', e.target.value)} 
               >
                 <option value="">-- Select Instructor --</option>
                 {teachers.map(t => (
                   <option key={t.id} value={t.id}>{t.name || t.email}</option>
                 ))}
               </Select>
             </div>

             <div className="space-y-2 md:col-span-2">
               <label className="text-xs text-blue-600 font-bold ">Course Description</label>
               <textarea 
                 rows={5} 
                 value={selectedCourse.description} 
                 onChange={(e) => handleUpdateField('description', e.target.value)} 
                 placeholder="Detailed description of what students will learn..."
                 className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-600 outline-none transition-colors resize-none"
               ></textarea>
             </div>
           </div>
         </motion.div>
       )}

       {activeTab === 'curriculum' && (
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
         >
           <div className="flex justify-between items-center bg-white/90 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl">
             <div>
               <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <Layers className="w-5 h-5 text-blue-600" /> Course Modules
               </h3>
               <p className="text-xs text-slate-500 mt-1">Total Modules: {selectedCourse.modules.length}</p>
             </div>
             <button 
               onClick={handleAddModule} 
               className="bg-slate-50 border border-blue-600 text-blue-600 px-4 py-2 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
             >
               <Plus className="w-4 h-4" /> Add Module
             </button>
           </div>

           <div className="space-y-4">
             {selectedCourse.modules.length === 0 ? (
               <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 p-12 text-center rounded-2xl">
                 <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <p className="text-slate-500 font-bold mb-2">No Modules Yet</p>
                 <p className="text-slate-400 text-xs ">Click 'Add Module' to start building the curriculum.</p>
               </div>
             ) : (
               selectedCourse.modules.map((mod, idx) => (
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   key={mod.id} 
                   className="bg-white/90 backdrop-blur-xl border border-slate-200/60 p-4 flex flex-col md:flex-row md:items-center gap-4 group hover:border-blue-600/60 transition-colors rounded-2xl"
                 >
                   <div className="flex items-center justify-center w-8 h-8 bg-blue-50 border border-slate-200 text-blue-600 font-bold text-sm shrink-0">
                     {idx + 1}
                   </div>
                   
                   <div className="flex-1 space-y-3 w-full">
                     <input 
                       type="text" 
                       value={mod.title} 
                       onChange={(e) => handleUpdateModule(mod.id, 'title', e.target.value)}
                       placeholder="Module Title (e.g. Introduction to Automation)" 
                       className="w-full bg-transparent border-b border-slate-100 px-2 py-1 text-slate-900 focus:border-blue-600 outline-none font-bold" 
                     />
                     <div className="flex items-center gap-2">
                       <input 
                         type="text" 
                         value={mod.duration} 
                         onChange={(e) => handleUpdateModule(mod.id, 'duration', e.target.value)}
                         placeholder="Duration (e.g. 45 mins)" 
                         className="w-1/3 bg-transparent border-b border-slate-100 px-2 py-1 text-xs text-slate-500 focus:border-blue-600 outline-none" 
                       />
                       <span className="text-xs text-slate-400 ">Video URL map managed on backend endpoint</span>
                     </div>
                   </div>
                   
                   <button 
                     onClick={() => handleRemoveModule(mod.id)} 
                     className="text-red-600/50 hover:text-red-600 p-2 transition-colors md:opacity-0 md:group-hover:opacity-100 self-end md:self-center"
                     title="Remove Module"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                 </motion.div>
               ))
             )}
           </div>
         </motion.div>
       )}
     </div>
   );
 }

 return (
   <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 ">
     <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
       <div>
         <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
           <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> Course Management
         </h1>
         <p className="text-slate-500 text-xs sm:text-sm ">&gt; Create courses, update modules, manage curriculum.</p>
       </div>
       <button 
         onClick={handleCreateCourse}
         className="bg-blue-600 border border-blue-600 text-white px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors shadow-[0_8px_30px_rgb(37,99,235,0.2)] flex items-center justify-center gap-2 w-full md:w-auto"
       >
         <Plus className="w-4 h-4" /> Create Course
       </button>
     </div>

     {isLoading ? (
       <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
     ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {courses.map((course, i) => (
           <motion.div 
             key={course.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 relative group hover:border-blue-400 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
           >
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-100 group-hover:bg-blue-600 transition-colors z-10"></div>
             
             {course.thumbnail ? (
               <div className="w-full h-32 mb-4 rounded-xl overflow-hidden relative border border-slate-100 ml-1">
                 <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
               </div>
             ) : (
               <div className="w-full h-32 mb-4 rounded-xl overflow-hidden relative border border-slate-100 bg-slate-50 flex items-center justify-center ml-1">
                 <div className="text-slate-300 flex items-center gap-2 font-bold text-xs"><LayoutDashboard className="w-4 h-4" /> No Image</div>
               </div>
             )}

             <div className="flex justify-between items-start mb-4 pl-2">
               <div>
                 <h3 className="font-bold text-slate-900 text-lg line-clamp-1" title={course.title}>{course.title}</h3>
                 <p className="text-xs text-blue-600 font-bold mt-1">{course.id.slice(0, 8)}</p>
               </div>
               <span className={`px-2 py-0.5 text-[10px] font-bold border shrink-0 ${course.status === 'active' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                 {course.status}
               </span>
             </div>
             
             <div className="pl-2 mb-6 space-y-2 flex-1">
               <div className="flex items-center justify-between text-xs text-slate-500 font-bold ">
                 <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Instructor</span>
                 <span className="text-slate-900">{course.profiles?.name || course.profiles?.email || 'Unassigned'}</span>
               </div>
               <div className="flex items-center justify-between text-xs text-slate-500 font-bold ">
                 <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Modules</span>
                 <span className="text-slate-900">{course.modules?.length || 0}</span>
               </div>
               <div className="flex items-center justify-between text-xs text-slate-500 font-bold ">
                 <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Enrolled</span>
                 <span className="text-slate-900">{course.students || 0}</span>
               </div>
               <div className="flex items-center justify-between text-xs text-slate-500 font-bold ">
                 <span className="flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5" /> Fee</span>
                 <span className="text-slate-900">₹{course.price}</span>
               </div>
             </div>

             <div className="flex items-center gap-2 pl-2 border-t border-slate-100 pt-4 mt-auto">
               <button 
                 onClick={() => handleEditCourse(course)}
                 className="flex-1 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-sm px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
               >
                 <Edit className="w-3.5 h-3.5" /> Edit
               </button>
               <button 
                 onClick={() => handleDeleteCourse(course.id)}
                 className="bg-transparent border border-red-200 text-red-600 hover:bg-red-50 hover:shadow-sm px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center"
                 title="Delete Course"
               >
                 <Trash2 className="w-3.5 h-3.5" />
               </button>
             </div>
           </motion.div>
         ))}
       </div>
     )}
   </div>
 );
}
