import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Settings, Shield, Bell, LayoutDashboard, Save, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API = "http://localhost:5000/api";

export default function AdminSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Default settings keys to display
  const defaultSettings = [
    { key: "allow_student_registration", label: "Allow Student Registration", description: "Open public signup endpoints.", category: "rbac" },
    { key: "auto_approve_enrollments", label: "Auto-Approve Enrollments", description: "Bypass manual admin verification for paid courses.", category: "rbac" },
    { key: "instructor_course_creation", label: "Instructor Course Creation", description: "Allow teachers to create new courses independently.", category: "rbac" },
    { key: "email_alerts_admin", label: "Email Alerts (Admin)", description: "Receive daily summary reports.", category: "notifications" },
    { key: "slack_discord_webhooks", label: "Slack/Discord Webhooks", description: "Push system alerts to comms channels.", category: "notifications" },
  ];

  useEffect(() => {
    if (token) fetchSettings();
  }, [token]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load settings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSettingValue = (key: string) => {
    const found = settings.find((s: any) => s.key === key);
    return found ? found.value === 'true' || found.value === true : false;
  };

  const handleToggle = async (key: string) => {
    const current = getSettingValue(key);
    const newValue = !current;
    setIsSaving(true);

    try {
      const res = await fetch(`${API}/admin/settings/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: String(newValue) }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSettings();
      }
    } catch (err) {
      console.error("Failed to update setting", err);
    } finally {
      setIsSaving(false);
    }
  };

  const rbacSettings = defaultSettings.filter(s => s.category === "rbac");
  const notifSettings = defaultSettings.filter(s => s.category === "notifications");

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 ">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" /> Platform Settings
          </h1>
          <p className="text-slate-500 text-sm">&gt; RBAC permission control, notification system.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-xl p-6"
          >
            <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> RBAC Access Control
            </h2>

            <div className="space-y-6">
              {rbacSettings.map((setting) => {
                const isOn = getSettingValue(setting.key);
                return (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{setting.label}</h3>
                      <p className="text-xs text-slate-500 mt-1">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(setting.key)}
                      disabled={isSaving}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isOn ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isOn ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-xl p-6"
          >
            <h2 className="text-sm font-bold text-blue-600 mb-6 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notification System
            </h2>

            <div className="space-y-6">
              {notifSettings.map((setting) => {
                const isOn = getSettingValue(setting.key);
                return (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{setting.label}</h3>
                      <p className="text-xs text-slate-500 mt-1">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(setting.key)}
                      disabled={isSaving}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isOn ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isOn ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
