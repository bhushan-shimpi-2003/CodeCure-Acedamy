import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { UserCog, LayoutDashboard, Plus, Edit, Trash2, Loader2, Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function StaffManagement() {
  const { token } = useAuth();
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/staff", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStaff(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStaff();
  }, [token]);

  const handleChangeRole = async (userId: string, currentRole: string) => {
    const newRole = prompt(`Current role is ${currentRole}. Enter new role (student, teacher, admin):`, currentRole);
    if (!newRole || !['student', 'teacher', 'admin'].includes(newRole.toLowerCase())) {
      if (newRole) alert("Invalid role. Use student, teacher, or admin.");
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole.toLowerCase() })
      });
      const data = await res.json();
      if (data.success) {
        alert("Role updated successfully!");
        fetchStaff();
      } else {
        alert(data.error || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-blue-600" /> Staff Management
          </h1>
          <p className="text-slate-500 text-sm ">&gt; Manage instructors, admins, and roles.</p>
        </div>
        <button className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add/Create Staff
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : staff.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          No staff members found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl p-6 relative group hover:border-blue-400 transition-colors flex flex-col"
            >
              <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${member.role === 'admin' ? 'bg-purple-100 group-hover:bg-purple-600' : 'bg-blue-100 group-hover:bg-blue-600'}`}></div>
              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg ">{member.name || "Unnamed"}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{member.email}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold border ${member.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                  {member.role.toUpperCase()}
                </span>
              </div>
              
              <div className="pl-2 mb-6 flex-1 text-sm text-slate-600">
                User ID: <span className="font-mono text-xs">{member.id.substring(0, 8)}...</span>
              </div>

              <div className="flex items-center gap-2 pl-2 border-t border-slate-100 pt-4 mt-auto">
                <button 
                  onClick={() => handleChangeRole(member.id, member.role)}
                  className="flex-1 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1.5 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5" /> Change Role
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
